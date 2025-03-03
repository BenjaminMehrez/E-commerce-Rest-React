from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from a_ecart.models import Cart, CartItem
from a_order.models import Order, OrderItem
from a_shipping.models import Shipping
from a_product.models import Product
from django.core.mail import send_mail
import braintree


gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=settings.BT_ENVIRONMENT,
        merchant_id=settings.BT_MERCHANT_ID,
        public_key=settings.BT_PUBLIC_KEY,
        private_key=settings.BT_PRIVATE_KEY,
    )
)


class GenerateTokenView(APIView):
    def get(self, request, format=None):
        try:
            token = gateway.client_token.generate()

            return Response(
                {'braintree_token': token},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when generating token'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetPaymentTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        shipping_id = request.query_params.get('shipping_id')
        shipping_id = str(shipping_id)

        try:
            cart = Cart.objects.get(user=user)
            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {'error': 'Need to have items in cart'},
                    status=status.HTTP_404_NOT_FOUND
                )

            cart_items = CartItem.objects.filter(cart=cart)

            for cart_item in cart_items:

                if not Product.objects.filter(id=cart_item.product.id).exists():
                    return Response(
                        {'error': 'Product does not exist'},
                        status=status.HTTP_404_NOT_FOUND
                    )

                if int(cart_item.count) > int(cart_item.product.quantity):
                    return Response(
                        {'error': 'Product out of stock'},
                        status=status.HTTP_404_NOT_FOUND
                    )

                total_amount = 0.0
                total_compare_amount = 0.0

                for cart_item in cart_items:
                    total_amount += (float(cart_item.product.price)
                                     * float(cart_item.count))
                    total_compare_amount += (float(cart_item.product.compare_price)
                                             * float(cart_item.count))

                total_compare_amount = round(total_compare_amount, 2)
                original_price = round(total_amount, 2)

                #  CUPONES

                shipping_cost = 0.0

                if Shipping.objects.filter(id__iexact=shipping_id).exists():

                    shipping = Shipping.objects.get(id=shipping_id)
                    shipping_cost = shipping.price
                    total_amount += float(shipping_cost)

                total_amount = round(total_amount, 2)

                return Response({
                    'original_price': f'{original_price:.2f}',
                    'total_compare_amount': f'{total_compare_amount:.2f}',
                    'shipping_cost': f'{shipping_cost:.2f}',
                    'total_amount': f'{total_amount:.2f}',
                },
                    status=status.HTTP_200_OK
                )

        except:
            return Response(
                {'error': 'Something went wrong when getting payment total'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProcessPaymentView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        nonce = data['nonce']
        shipping_id = str(data['shipping_id'])

        # CUPONES

        full_name = data['full_name']
        address_line_1 = data['address_line_1']
        address_line_2 = data['address_line_2']
        city = data['city']
        state_province_region = data['state_province_region']
        postal_code = data['postal_code']
        country = data['country']
        telephone_number = data['telephone_number']

        if not Shipping.objects.filter(id__iexact=shipping_id).exists():
            return Response(
                {'error': 'Shipping option does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        cart = Cart.objects.get(user=user)

        if not CartItem.objects.filter(cart=cart).exists():
            return Response(
                {'error': 'Need to have items in cart'},
                status=status.HTTP_404_NOT_FOUND
            )

        cart_items = CartItem.objects.filter(cart=cart)

        for cart_item in cart_items:
            if not Product.objects.filter(id=cart_item.product.id).exists():
                return Response(
                    {'error': 'Product does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
            if int(cart_item.count) > int(cart_item.product.quantity):
                return Response(
                    {'error': 'Product out of stock'},
                    status=status.HTTP_404_NOT_FOUND
                )

        total_amount = 0.0

        for cart_item in cart_items:
            total_amount += (float(cart_item.product.price)
                             * float(cart_item.count))

        #  CUPONES

        shipping = Shipping.objects.get(id=int(shipping_id))

        shipping_name = shipping.name
        shipping_time = shipping.time_to_delivery
        shipping_price = shipping.price

        total_amount += float(shipping_price)
        total_amount = round(total_amount, 2)

        try:
            newTransaction = gateway.transaction.sale({
                'amount': str(total_amount),
                'payment_method_nonce': str(nonce['nonce']),
                'options': {
                    'submit_for_settlement': True
                }
            })
        except:
            return Response(
                {'error': 'Error proccessing payment'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        if newTransaction.is_success or newTransaction.transaction:

            for cart_item in cart_items:
                update_product = Product.objects.get(id=cart_item.product.id)

                quantity = int(update_product.quantity) - int(cart_item.count)

                sold = int(update_product.sold) + int(cart_item.count)

                Product.objects.filter(id=cart_item.product.id).update(
                    quantity=quantity, sold=sold
                )
                
            try:
                order = Order.objects.create(
                    user=user,
                    transaction_id=newTransaction.transaction.id,
                    amount=total_amount,
                    full_name=full_name,
                    address_line_1=address_line_1,
                    address_line_2=address_line_2,
                    city=city,
                    state_province_region=state_province_region,
                    postal_code=postal_code,
                    country=country,
                    telephone_number=telephone_number,
                    shipping_name=shipping_name,
                    shipping_time=shipping_time,
                    shipping_price=float(shipping_price),
                )
            except:
                return Response(
                    {'error': 'Error proccessing payment'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
            for cart_item in cart_items:
                try:
                    product = Product.objects.get(id=cart_item.product.id)
                    
                    OrderItem.objects.create(
                        product=product,
                        order=order,
                        name=product.name,
                        price=cart_item.product.price,
                        count=cart_item.count
                    )
                except:
                    return Response(
                        {'error': 'Transiction failed'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
                
            try:
                send_mail(
                    'Detalles de tu orden',
                    'Hey ' + full_name + ','
                    + '\n\nWe recieved your order!'
                    + '\n\nGive us some time to process your order and ship it out to you.'
                    + '\n\nYou can go on your user dashboard to check the status of your order.'
                    + '\n\nSincerely,'
                    + '\nShop Time',
                    'pennylanemehrez@gmail.com',
                    [user.email],
                    fail_silently=False
                )
            except:
                return Response(
                    {'error': 'Transaction succeeded and order created, but failed'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
                
            try:
                CartItem.objects.filter(cart=cart).delete()
                
                Cart.objects.filter(user=user).update(total_items=0)
            except:
                return Response(
                    {'error': 'Transaction succeeded and order successful, but failed to clear cart'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
            return Response(
                {'success': 'Transaction successful and order was created'},
                status=status.HTTP_200_OK
            )
            
        else:
            return Response(
                {'error': 'Transaction failed'},
                status=status.HTTP_400_BAD_REQUEST
            )