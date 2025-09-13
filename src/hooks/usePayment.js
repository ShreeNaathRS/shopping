import { useRazorpay } from "react-razorpay";

export const usePayment = () => {
    const { Razorpay } = useRazorpay();
    const doPayment = async ({responseData, successHandler, failureHandler}) =>{
        try{
            
            const options = {
                key: "rzp_test_RGE8UNieYQNDVG",
                amount: responseData.amount,
                currency: responseData.currency,
                name: "SwiftKart",
                description: "Purchase!",
                order_id: responseData.id,
                handler: (razorpayResponse)=>successHandler({receiptId: razorpayResponse.razorpay_order_id, paymentId: razorpayResponse.razorpay_payment_id, signature: razorpayResponse.razorpay_signature}),
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#F37254",
                },
            };
            const rzp = new Razorpay(options);
            rzp.on('payment.failed', failureHandler);
            rzp.open();
        } catch(err){
            console.error(err)
        }
    }
    return {
        doPayment
    }
}