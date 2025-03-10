import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartQuery } from "@/hooks/useCart";
import { useCheckout, CheckoutData } from "@/hooks/useCheckout";
import { formatCurrency } from "@/lib/utils";

export function CheckoutForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: cart } = useCartQuery();
  const checkout = useCheckout();
  const sameAsBilling = watch("sameAsBilling", true);

  const safeCart = cart || {
    cartItems: [],
    itemCount: 0,
    totalQuantity: 0,
    totalAmount: 0,
  };

  const subtotal = safeCart.totalAmount;
  const shipping = 15;
  const tax = subtotal * 0.01;
  const total = subtotal + shipping + tax;

  const onSubmit = async (data: CheckoutData) => {
    try {
      setIsSubmitting(true);
      await checkout.mutateAsync(data);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">Contact information</h2>
            <div className="mt-4">
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium">Payment details</h2>
            <div className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="nameOnCard">Name on card</Label>
                <Input
                  type="text"
                  id="nameOnCard"
                  {...register("nameOnCard", {
                    required: "Name on card is required",
                  })}
                  className="mt-1"
                />
                {errors.nameOnCard && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.nameOnCard.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="cardNumber">Card number</Label>
                <Input
                  type="text"
                  id="cardNumber"
                  {...register("cardNumber", {
                    required: "Card number is required",
                    pattern: {
                      value: /^[0-9]{16}$/,
                      message: "Please enter a valid 16-digit card number",
                    },
                  })}
                  className="mt-1"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expirationDate">
                    Expiration date (MM/YY)
                  </Label>
                  <Input
                    type="text"
                    id="expirationDate"
                    {...register("expirationDate", {
                      required: "Expiration date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: "Please enter a valid date (MM/YY)",
                      },
                    })}
                    className="mt-1"
                  />
                  {errors.expirationDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.expirationDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    type="text"
                    id="cvc"
                    {...register("cvc", {
                      required: "CVC is required",
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: "Please enter a valid CVC",
                      },
                    })}
                    className="mt-1"
                  />
                  {errors.cvc && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.cvc.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium">Shipping address</h2>
            <div className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="company">Company (Optional)</Label>
                <Input
                  type="text"
                  id="company"
                  {...register("company")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  className="mt-1"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                <Input
                  type="text"
                  id="apartment"
                  {...register("apartment")}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    {...register("city", { required: "City is required" })}
                    className="mt-1"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input
                    type="text"
                    id="state"
                    {...register("state", { required: "State is required" })}
                    className="mt-1"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal code</Label>
                  <Input
                    type="text"
                    id="postalCode"
                    {...register("postalCode", {
                      required: "Postal code is required",
                      pattern: {
                        value: /^[0-9]{5}(-[0-9]{4})?$/,
                        message: "Please enter a valid postal code",
                      },
                    })}
                    className="mt-1"
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="sameAsBilling"
              {...register("sameAsBilling")}
              defaultChecked
            />
            <Label htmlFor="sameAsBilling">
              Billing address is the same as shipping address
            </Label>
          </div>

          {!sameAsBilling && (
            <div>
              <h2 className="text-lg font-medium">Billing address</h2>
              <div className="mt-4 grid gap-4">
                <div>
                  <Label htmlFor="billingCompany">Company (Optional)</Label>
                  <Input
                    type="text"
                    id="billingCompany"
                    {...register("billingCompany")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="billingAddress">Address</Label>
                  <Input
                    type="text"
                    id="billingAddress"
                    {...register("billingAddress", {
                      required: !sameAsBilling && "Billing address is required",
                    })}
                    className="mt-1"
                  />
                  {errors.billingAddress && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.billingAddress.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="billingApartment">
                    Apartment, suite, etc.
                  </Label>
                  <Input
                    type="text"
                    id="billingApartment"
                    {...register("billingApartment")}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="billingCity">City</Label>
                    <Input
                      type="text"
                      id="billingCity"
                      {...register("billingCity", {
                        required: !sameAsBilling && "City is required",
                      })}
                      className="mt-1"
                    />
                    {errors.billingCity && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.billingCity.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="billingState">State / Province</Label>
                    <Input
                      type="text"
                      id="billingState"
                      {...register("billingState", {
                        required: !sameAsBilling && "State is required",
                      })}
                      className="mt-1"
                    />
                    {errors.billingState && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.billingState.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="billingPostalCode">Postal code</Label>
                    <Input
                      type="text"
                      id="billingPostalCode"
                      {...register("billingPostalCode", {
                        required: !sameAsBilling && "Postal code is required",
                        pattern: {
                          value: /^[0-9]{5}(-[0-9]{4})?$/,
                          message: "Please enter a valid postal code",
                        },
                      })}
                      className="mt-1"
                    />
                    {errors.billingPostalCode && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.billingPostalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || checkout.isPending}
          >
            {isSubmitting || checkout.isPending
              ? "Processing..."
              : "Complete order"}
          </Button>
        </form>
      </div>

      <div className="mt-10 lg:mt-0">
        <div className="sticky top-4 rounded-lg bg-gray-50 p-6">
          <h2 className="text-lg font-medium">Order summary</h2>

          <div className="mt-6 space-y-4">
            {safeCart.cartItems.map((item) => (
              <div key={item.productId} className="flex items-center gap-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium">
                    <h3>{item.name}</h3>
                    <p className="ml-4">{formatCurrency(item.price)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <p>Subtotal</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Shipping</p>
              <p>{formatCurrency(shipping)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Taxes</p>
              <p>{formatCurrency(tax)}</p>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-medium">
              <p>Total</p>
              <p>{formatCurrency(total)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
