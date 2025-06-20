import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function RazorpayReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const razorpayPaymentId = params.get("razorpay_payment_id");
  const razorpayOrderId = params.get("razorpay_order_id");
  const razorpaySignature = params.get("razorpay_signature");

  useEffect(() => {
    if (razorpayPaymentId && razorpayOrderId && razorpaySignature) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ 
        paymentId: razorpayPaymentId, 
        orderId: razorpayOrderId, 
        signature: razorpaySignature 
      })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success"; // Redirect to success page
        } else {
          // Handle payment failure scenario
          window.location.href = "/shop/payment-failure"; // Redirect to failure page
        }
      });
    }
  }, [razorpayPaymentId, razorpayOrderId, razorpaySignature, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default RazorpayReturnPage;
