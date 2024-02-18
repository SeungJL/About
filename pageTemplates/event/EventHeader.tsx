import { Box } from "@chakra-ui/react";
import { faCircleP } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components2/Header";
import { useUserInfoQuery } from "../../hooks/user/queries";

interface IEventHeader {}
export default function EventHeader({}: IEventHeader) {
  const { data: userInfo } = useUserInfoQuery();

  return (
    <Header title="이벤트">
      <Box>
        <FontAwesomeIcon
          icon={faCircleP}
          style={
            {
              "--fa-primary-color": "#51261f",
              "--fa-secondary-color": "#1f5135",
            } as React.CSSProperties
          }
        />
        {userInfo?.point} P
      </Box>
    </Header>
  );
}
