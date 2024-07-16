import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { useMemo } from "react";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { storeItemsData, removeFromCart } = useShoppingCart();
  const { imgUrl, name, price } =
    storeItemsData.find((item) => item.id === id) || {};
  const totalAmount = useMemo(() => {
    return price ? price * quantity : 0;
  }, [price, quantity]);
  return (
    <Stack direction="horizontal">
      <div className="d-flex align-items-center me-auto" style={{ gap: "3px" }}>
        <img
          src={imgUrl}
          style={{
            objectFit: "cover",
            width: "125px",
            height: "75px",
            borderRadius: "7px",
          }}
        />
        <div>
          <div>
            {name}{" "}
            <span
              className="rounded"
              style={{
                fontSize: "8px",
                backgroundColor: "gray",
                padding: "1px 3px",
                color: "white",
              }}
            >
              x{quantity}
            </span>
          </div>
          <div className="text-muted" style={{ fontSize: "12px" }}>
            {formatCurrency(price ?? 0)}
          </div>
        </div>
      </div>
      <div>
        <span className="">{formatCurrency(totalAmount)}</span>
        <Button variant="outline-danger" onClick={() => removeFromCart(id)}>
          X
        </Button>
      </div>
    </Stack>
  );
}
