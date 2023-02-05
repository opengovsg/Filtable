// icon:bx-minus-circle | Boxicons https://boxicons.com/
import { chakra } from "@chakra-ui/react";

const BxMinusCircle = chakra((props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M7 11h10v2H7z"></path>{" "}
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>{" "}
    </svg>
  );
});
export default BxMinusCircle;
