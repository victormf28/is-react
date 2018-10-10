export default {
    getUserByID:
        `query($data:UserWhereUniqueInput!){
            user(where:$data){
                name,
                email,
                age,
                accessRole
            }
        }`
}