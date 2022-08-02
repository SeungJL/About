import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useMutation, UseMutationOptions } from "react-query";
import { AttendDTO } from "../../models/interface/vote";

export const useAttendMutation = (
  currentDate: Dayjs,
  options?: Omit<UseMutationOptions<void, AxiosError, AttendDTO>, 'mutationKey' | 'mutationFn'>,
  ) => useMutation<void, AxiosError, AttendDTO>(
  async (attendDTO: AttendDTO) => {
    await axios.post(`/api/vote/${currentDate.format('YYYY-MM-DD')}`, attendDTO)
  },
  options,
)

export const useAbsentMutation = (
  currentDate: Dayjs,
  options?: Omit<UseMutationOptions<void, AxiosError, void>, 'mutationKey' | 'mutationFn'>,
) => useMutation<void, AxiosError, void>(
  async () => {
    await axios.delete(`/api/vote/${currentDate.format('YYYY-MM-DD')}`)
  },
  options,
)

export const useConfirmMutation = (
  currentDate: Dayjs,
  options?: Omit<UseMutationOptions<void, AxiosError, void>, 'mutationKey' | 'mutationFn'>,
) => useMutation<void, AxiosError, void>(
  async () => {
    await axios.patch(`/api/vote/${currentDate.format('YYYY-MM-DD')}/confirm`)
  },
  options,
)

export const useDismissMutation = (
  currentDate: Dayjs,
  options?: Omit<UseMutationOptions<void, AxiosError, void>, 'mutationKey' | 'mutationFn'>,
) => useMutation<void, AxiosError, void>(
  async () => {
    await axios.patch(`/api/vote/${currentDate.format('YYYY-MM-DD')}/dismiss`)
  },
  options,
)