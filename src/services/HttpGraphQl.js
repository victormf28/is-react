import axios from 'axios'

export class HttpGraphQl {
  url = ''

  constructor() {
    this.url = `https://eu1.prisma.sh/sergio-melendez-f22980/database/dev`
  }

  query(params) {
    return axios.post(this.url, params).then(({ data }) => data)
  }
}
