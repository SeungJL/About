import { signOut, useSession } from "next-auth/react";
import { FC } from "react";

const Header: FC = () => {
  const { data: session } = useSession()

  if (!session) 
    return (
      <div>
        {/* LOGO */}
      </div>
    )

  return (
    <div>
      <div>

      </div>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  )
}

export default Header