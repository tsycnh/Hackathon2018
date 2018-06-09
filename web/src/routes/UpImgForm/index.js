

import React from 'react';
import { Form, Input, Icon, Button, Upload } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;


const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [{ value: 'xihu', label: 'West Lake', }],
        }],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
            value: 'nanjing',
            label: 'Nanjing',
            children: [{ value: 'zhonghuamen', label: 'Zhong Hua Men', }],
        }],
    }
];

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);

                const { owner, price, description, tags } = values;
                const { thumbUrl } = values.data.file;

                var url = 'http://10.1.4.179:5000';
                axios.post('/add_to_chain', {
                    owner, price, description, tags,
                    data: thumbUrl
                })
                .then(resp => console.log(resp))
                .catch(err => console.error(err));
 

            }
        });
    }

    /**
     * 
      {
            data: 'img base64',
            owner: '32 bit id',
            price: 10.0,
            description: 'image information',
            tags: ["tag1", "tag2"],
       }
     * 
     */

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 7 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 14 }, },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0, },
                sm: { span: 16, offset: 0, },
            },
        };

        const props = {
            // action: '//jsonplaceholder.typicode.com/posts/',
            customRequest: async ({ action, file, onSuccess, onError, onProgress }) => {

                const base64 = await new Promise(resolve => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                        resolve(fileReader.result);
                    };
                });

                // axios.post(
                //         action,
                //         { image_category: 'default', image_str: base64 },
                //         { onUploadProgress: onProgress }
                //     )
                //     .then(response => {
                //         onSuccess(response.data);
                //     }, onError);

                // return {
                //     abort() {
                //         alert('image uploader aborted');
                //     },
                // };
            },
            listType: 'picture'
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem  {...formItemLayout} label="Owner ID">
                    {getFieldDecorator('owner', {
                        rules: [{ required: true, message: 'Please input your ID!', }],
                    })(<Input />)}
                </FormItem>

                <FormItem  {...formItemLayout}
                    style={{ textAlign: 'left' }}
                    label="Upload"
                >
                    {getFieldDecorator('data', {
                        rules: [{ required: true, message: 'Please input your ID!', }],
                    })(
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> upload
                            </Button>
                        </Upload>
                    )}
                </FormItem>

                <FormItem  {...formItemLayout} wrapperCol={{ sm: { span: 7 } }}
                    label="Price"
                >
                    {getFieldDecorator('price', {
                        rules: [{ required: true, message: 'Please input your Image`s Price!', }],
                    })(<Input type="Number" />)}
                </FormItem>

                <FormItem  {...formItemLayout} wrapperCol={{ sm: { span: 7 } }} label="Tags">
                    {getFieldDecorator('tags')(
                        <Input />
                    )}
                </FormItem>

                <FormItem  {...formItemLayout} label="Description">
                    {getFieldDecorator('description')(
                        <Input.TextArea rows={4} />)
                    }
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确认上传</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;