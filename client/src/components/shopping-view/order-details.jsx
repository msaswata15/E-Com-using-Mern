import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { CheckCircle, Clock, Package, Truck } from "lucide-react"; // Import icons

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  const getOrderTimeline = (status) => {
    const timeline = [
      { status: 'pending', label: 'Order Placed', icon: Clock },
      { status: 'confirmed', label: 'Confirmed', icon: CheckCircle },
      { status: 'processing', label: 'Processing', icon: Package },
      { status: 'shipped', label: 'Shipped', icon: Truck },
      { status: 'delivered', label: 'Delivered', icon: CheckCircle }
    ];

    const currentIndex = timeline.findIndex(item => item.status === orderDetails?.orderStatus);
    return timeline.map((item, index) => ({
      ...item,
      isCompleted: index <= currentIndex,
    }));
  };

  return (
    <DialogContent className="sm:max-w-[800px]">
      <div className="grid gap-6">
        {/* Order Status Timeline */}
        <div className="my-8">
          <div className="relative flex justify-between">
            {getOrderTimeline().map((step, index) => (
              <div key={step.status} className="flex flex-col items-center">
                <div className={`rounded-full p-2 ${
                  step.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {<step.icon size={20} />}
                </div>
                <p className="mt-2 text-sm font-medium">{step.label}</p>
                {index < getOrderTimeline().length - 1 && (
                  <div className={`absolute top-5 left-0 h-[2px] ${
                    step.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{
                    width: `${100 / (getOrderTimeline().length - 1)}%`,
                    left: `${(100 * index) / (getOrderTimeline().length - 1)}%`
                  }}/>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between" key={item.title}>
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ₹{item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
