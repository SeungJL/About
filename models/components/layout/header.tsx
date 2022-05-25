import { Box, Button } from "@chakra-ui/react";
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
    <Box>
      <Box>

      </Box>
      <Button onClick={() => signOut()}>로그아웃</Button>
    </Box>
  )
}

export default Header