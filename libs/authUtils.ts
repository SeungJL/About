export const role = {
  stranger: '미인증 사용자',
  member: '회원',
  previliged: '관리자',
}

export const getRoleName = (roleStr: string) => {
  if (role[roleStr]) {
    return role[roleStr]
  }
  return role.stranger
}

export const isStranger = (roleStr: string) => {
  return getRoleName(roleStr) === role.stranger
}

export const isMember = (roleStr: string) => {
  return [role.member, role.previliged].includes(getRoleName(roleStr))
}

export const isPreviliged = (roleStr: string) => {
  return getRoleName(roleStr) === role.previliged
}