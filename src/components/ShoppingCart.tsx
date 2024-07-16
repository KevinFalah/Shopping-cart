import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { useMemo } from "react";
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, storeItemsData } = useShoppingCart();
  const totalMustPay = useMemo(() => {
    return cartItems.reduce((total, currItem) => {
      const findItemPrice =
        storeItemsData.find((item) => item.id === currItem.id)?.price || 0;

      return total + findItemPrice * currItem.quantity;
    }, 0);
  }, [cartItems, storeItemsData]);

  return (
    <Offcanvas
      scroll={true}
      backdrop={true}
      show={isOpen}
      placement="end"
      onHide={closeCart}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
        <div className="fw-bold fs-4 mt-4 text-end">
          Total {formatCurrency(totalMustPay)}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
