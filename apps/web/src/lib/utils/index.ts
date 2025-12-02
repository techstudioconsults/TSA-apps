import moment from "moment";

export function formatDateTime(dateString: string | undefined) {
  const date = moment(dateString);

  const formattedDate = date.format("MMM DD, YYYY");
  const formattedTime = date.format("HH:mm:ss");

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT" | "NGN";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const { currency = "NGN", notation = "compact" } = options;

  const numericPrice =
    typeof price === "string" ? Number.parseFloat(price) : price;

  const newPrice = new Intl.NumberFormat("en-US", {
    currency,
    notation,
    style: currency === "NGN" ? "currency" : "currency",
    currencyDisplay: currency === "NGN" ? "symbol" : undefined,
    maximumFractionDigits: 2,
  }).format(numericPrice);

  return currency === "NGN" ? `₦${newPrice.replace(/NGN\s?/, "")}` : newPrice;
}

export const formatTime = (time: number): string => {
  return time < 10 ? `0${time}` : `${time}`;
};
