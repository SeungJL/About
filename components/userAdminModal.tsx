import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  HStack,
  useToast,
  VStack,
  Badge,
  Divider,
  Skeleton,
  SkeletonCircle,
  Select,
  FormControl,
  Container,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FC, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { role } from "../libs/utils/authUtils";
import { IUser } from "../models/user";
import ProfileImage from "./profileImage";

const UserAdminModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}> = ({ isOpen, onClose, userId }) => {
  const toast = useToast();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const queryClient = useQueryClient();
  const { isFetching, data: user } = useQuery<
    IUser,
    AxiosError,
    IUser,
    [string, string]
  >(
    ["fetchAdminUserInfo", userId],
    async ({ queryKey }) => {
      const [_key, userId] = queryKey;
      const res = await axios.get(`/api/admin/user/${userId}/info`);
      return res.data;
    },
    {
      onSuccess: (user) => {
        setSelectedRole(user.role);
        return user;
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "실패",
          description: "사용자 정보를 불러오는데 실패했어요",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      },
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries("fetchUserInfo");
  }, [userId]);

  const onChangeRole = async (
    values: { role: string },
    action: FormikHelpers<{ role: string }>
  ) => {
    const { setSubmitting } = action;

    setSubmitting(true);

    await axios.patch(`/api/admin/user/${userId}/role`, {
      role: values.role,
    });
    setSubmitting(false);

    onClose();
  };

  return (
    <Modal size="xs" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>사용자 정보</ModalHeader>
        <ModalBody>
          <HStack spacing={3} marginBottom="20px">
            <SkeletonCircle
              width="fit-content"
              height="fit-content"
              isLoaded={!isFetching}
            >
              <ProfileImage
                src={user?.profileImage}
                alt={user?.name}
                width="90px"
              />
            </SkeletonCircle>
            <VStack alignItems="flex-start">
              <Skeleton isLoaded={!isFetching}>
                <Text as="span" fontSize="2xl" fontWeight="400">
                  {user?.name}
                </Text>
              </Skeleton>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between" margin="5px 0">
            <HStack justifyContent="space-between" margin="5px 0">
              <Box key="1week" flex={1}>
                <HStack justifyContent="center" alignItems="center">
                  <Text
                    as="span"
                    fontSize="sm"
                    width="fit-content"
                    marginRight="2px"
                  >
                    2주
                  </Text>
                </HStack>
                <Text
                  fontSize="lg"
                  fontWeight="600"
                  width="fit-content"
                  margin="auto"
                >
                  {user?.statistic?.openCnt2Week}회(
                  {user?.statistic?.voteCnt2Week}회)
                </Text>
              </Box>
              <Divider orientation="vertical" height="2rem" />
              <Box key="4week" flex={1}>
                <HStack justifyContent="center" alignItems="center">
                  <Text
                    as="span"
                    fontSize="sm"
                    width="fit-content"
                    marginRight="2px"
                  >
                    4주
                  </Text>
                </HStack>
                <Text
                  fontSize="lg"
                  fontWeight="600"
                  width="fit-content"
                  margin="auto"
                >
                  {user?.statistic?.openCnt4Week}회(
                  {user?.statistic?.voteCnt4Week}회)
                </Text>
              </Box>
              <Divider orientation="vertical" height="2rem" />
            </HStack>
          </HStack>
          {user && (
            <Formik
              initialValues={{
                role: user.role,
              }}
              onSubmit={onChangeRole}
            >
              {(props) => (
                <Form>
                  <HStack justifyContent="space-between">
                    <Field name="role">
                      {({ field }) => (
                        <Select {...field} flex="1">
                          {Object.values(role).map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.display}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>
                    <Button
                      isLoading={props.isSubmitting}
                      type="submit"
                      colorScheme="yellow"
                    >
                      변경
                    </Button>
                  </HStack>
                </Form>
              )}
            </Formik>
          )}
        </ModalBody>
        <ModalFooter>
          <Button width="100%" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserAdminModal;
