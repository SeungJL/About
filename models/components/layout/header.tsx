import { useSession } from "next-auth/react";
import { FC } from "react";

const Header: FC = () => {
  const { data: session } = useSession()

  return (
    <div>
      
    </div>
  )
}

export default Header