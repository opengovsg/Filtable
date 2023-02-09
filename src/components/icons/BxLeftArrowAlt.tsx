// icon:bx-left-arrow-alt | Boxicons https://boxicons.com/
import { chakra } from "@chakra-ui/react";

const BxLeftArrowAlt = chakra((props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
    </svg>
  );
});

export default BxLeftArrowAlt;
