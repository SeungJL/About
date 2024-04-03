import { Box, List, ListItem } from "@chakra-ui/react";
import { faCircleCheck } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ICheckList {
  contents: string[];
}

export default function CheckList({ contents }: ICheckList) {
  return (
    <List spacing="12px">
      {contents.map((list, idx) => (
        <ListItem key={idx}>
          <Box as="span" mr="8px">
            <FontAwesomeIcon icon={faCircleCheck} color="var(--color-mint)" />
          </Box>
          {list}
        </ListItem>
      ))}
    </List>
  );
}
