import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'element-react';

import { HttpGraphQl } from './../../../services/HttpGraphQl'
import ListUsersQueries from './FormUser.queries.js'
import ListUsersMutations from './FormUser.mutations.js'

const oHttpGraphQl = new HttpGraphQl()

export class FormUser extends Component {
    formUser = {
        name: "",
        age: '',
        email: "",
        accessRole: ""
    }
    constructor(props) {
        super(props);

        this.state = {
            form: { ...this.formUser }
        }

        if (this.props.match.params.id) {
            this.getUser()
        }
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.props.match.params.id) {
            this.updateUser()
        }
        else {
            this.addUser()
        }
    }

    addUser() {
        let form = { ...this.state.form }
        form.age = parseInt(this.state.form.age)

        oHttpGraphQl.query({
            query: ListUsersMutations.addUser,
            variables: {
                data: form
            }
        }).then(({ data }) => {
            if (data.createUser) {
                Message({
                    message: 'Usuario guardado correctamente.',
                    type: 'success'
                });
                this.setState({
                    form: { ...this.formUser }
                });
            }
            else {
                Message.error("Ocurrio un problema");
            }
        })
    }

    getUser() {
        oHttpGraphQl.query({
            query: ListUsersQueries.getUserByID,
            variables: {
                data: {
                    id: this.props.match.params.id
                }
            }
        }).then(({ data }) => {
            this.setState({
                form: data.user
            });
        })
    }

    updateUser() {
        let form = { ...this.state.form }
        form.age = parseInt(this.state.form.age)

        oHttpGraphQl.query({
            query: ListUsersMutations.updateUSer,
            variables: {
                data: form,
                where: {
                    id: this.props.match.params.id
                }
            }
        }).then(({ data }) => {
            if (data.updateUser) {
                Message({
                    message: 'Usuario guardado correctamente.',
                    type: 'success'
                });
            }
            else {
                this.$message.error({
                    message: 'Ocurrio un problema'
                })
            }
        })
    }

    render() {
        return (
            <div className="contaier">
                <h1>Form User</h1>

                <Form className="en-US" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="Nombre">
                        <Input required value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                    </Form.Item>
                    <Form.Item label="Edad">
                        <Input required type="number" value={this.state.form.age} onChange={this.onChange.bind(this, 'age')}></Input>
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input required type="email" value={this.state.form.email} onChange={this.onChange.bind(this, 'email')}></Input>
                    </Form.Item>
                    <Form.Item label="Rol">
                        <Input required value={this.state.form.accessRole} onChange={this.onChange.bind(this, 'accessRole')}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button>
                            <a href="/">Cancelar</a>
                        </Button>
                        <Button type="primary" nativeType="submit">Guardar</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}