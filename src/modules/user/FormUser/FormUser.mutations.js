export default {
    addUser:
        `mutation($data:UserCreateInput!){
            createUser(data:$data){
                name,
                email,
                age,
                accessRole
            }
        }`,
    updateUSer:
        `mutation($data:UserUpdateInput!, $where: UserWhereUniqueInput!){
            updateUser(data:$data, where:$where){
                    id,
                name,
                email,
                age,
                accessRole
            }
        }`,
}