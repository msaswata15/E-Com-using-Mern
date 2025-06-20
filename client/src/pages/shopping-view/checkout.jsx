import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice"; // This should handle order creation
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { capturePayment } from "@/store/shop/order-slice";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize navigate

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  // Updated function to initiate Razorpay payment
  async function handleInitiateRazorpayPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay", // Changed from 'paypal' to 'razorpay'
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    // Dispatch action to create the order
    const response = await dispatch(createNewOrder(orderData));
    console.log(response, "sangam");
    if (response?.payload?.success) {
      // If order is created successfully, start payment
      startRazorpayPayment(response.payload);
    } else {
      setIsPaymemntStart(false);
    }
  }

  // Function to start Razorpay payment
  const startRazorpayPayment = (order) => {
    const options = {
      key: 'rzp_test_qRIqFuI8IjFwag', // Replace with your Razorpay key ID
      amount: order.amount * 100, // Amount is in paise
      currency: "INR",
      name: "eCommExpress",
      description: "Order Payment",
      order_id: order.razorpayOrderId, // Use Razorpay order ID
      handler: function (response) {
        console.log(response);

        // Store the order ID in session storage for tracking
        sessionStorage.setItem('lastOrderId', order.orderId);

        // Dispatch action to capture payment and update order
        dispatch(capturePayment({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: order.razorpayOrderId,
          orderId: order.orderId
        }))
          .then((res) => {
            if (res.payload?.success) {
              toast({
                title: "Payment Successful!",
                description: "Your order has been placed successfully.",
                variant: "success",
                duration: 3000
              });

              // Short delay to show the success message before redirect
              setTimeout(() => {
                // Redirect to orders page with the order ID
                navigate(`/shop/orders/${order.orderId}`);
              }, 2000);
            } else {
              toast({
                title: "Payment verification failed",
                description: "Please try again or contact support if the issue persists.",
                variant: "destructive",
              });
            }
          })
          .catch((error) => {
            console.error('Payment verification error:', error);
            toast({
              title: "Payment verification error",
              description: "An unexpected error occurred. Please check your order status.",
              variant: "destructive",
            });
            // Redirect to orders page even on error so user can check status
            setTimeout(() => {
              navigate('/shop/orders');
            }, 2000);
          });
      },
      prefill: {
        name: user.name,
        email: user.email,
        phone: currentSelectedAddress.phone,
      },
      notes: {
        address: currentSelectedAddress.address,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Redirect to approval URL if it exists
  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiateRazorpayPayment} className="w-full">
              {isPaymentStart
                ? "Processing Razorpay Payment..."
                : "Checkout with Razorpay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
