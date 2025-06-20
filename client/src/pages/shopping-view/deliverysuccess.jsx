import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
function deliverysuccess (){
    const navigate = useNavigate();

    return (
      <Card className="p-10">
        <CardHeader className="p-0">
          <CardTitle className="text-4xl">Your Order is confirmed!😊</CardTitle>
        </CardHeader>
        <Button className="mt-5" onClick={() => navigate("/shop/account")}>
          View Orders
        </Button>
      </Card>
    );
  }
export default deliverysuccess;

