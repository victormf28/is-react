export default {
    listUsers:
        `{
            users(orderBy:id_DESC){
                id,
                name,
                age,
                email,
                accessRole
            }
        }`,
}