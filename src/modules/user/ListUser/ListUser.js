import React, { Component } from 'react';
import { Table, Button } from 'element-react';

import { HttpGraphQl } from './../../../services/HttpGraphQl'
import ListUsersQueries from './ListUser.queries.js'
const oHttpGraphQl = new HttpGraphQl()


export class ListUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableColum: [
                {
                    label: "Nombre",
                    prop: "name",
                    width: 180
                },
                {
                    label: "Edad",
                    prop: "age",
                    width: 180
                },
                {
                    label: "Email",
                    prop: "email",
                    width: 180
                },
                {
                    label: "Rol",
                    prop: "accessRole",
                    width: 180
                },
                {
                    label: "Opciones",
                    render: ({ id }) => {
                        return (
                            <span>
                                <a href={`/editar-usuario/${id}`}>
                                    <Button plain={true} type="info" size="small">Editar</Button>
                                </a>
                                <Button plain={true} type="danger" size="small">Eliminar</Button>
                            </span>
                        )
                    }
                }
            ],
            listUsers: []
        }

        this.loadUsers()
    }

    loadUsers() {
        oHttpGraphQl.query({
            query: ListUsersQueries.listUsers,
        }).then(({ data }) => {
            this.setState({ listUsers: data.users });
        })
    }

    render() {
        return (
            <div className="contaier">
                <h1>List User</h1>
                <a href="/nuevo-usuario">
                    <Button plain={true} type="info" size="small">Nuevo Usuario</Button>
                </a>
                <Table
                    style={{ width: '100%' }}
                    columns={this.state.tableColum}
                    data={this.state.listUsers}
                />
            </div>
        );
    }
}