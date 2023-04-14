import { Button, Form, Row, Col, Input, Select,  Drawer, Upload, InputNumber, FormInstance } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import ImgCrop from 'antd-img-crop';
import { useGetCategories } from "../../hooks/useGetCategories";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 32 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 32 },
    sm: { span: 24 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 32, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};




interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    onFinish: (e: React.FormEvent<HTMLInputElement>) => void;
    onChangeImg: (e: UploadChangeParam<UploadFile<any>>) => void;
    fileList: UploadFile<any>[];
    form: FormInstance<any>;
}




export const DrawerWindow: React.FC<DrawerProps> = ({onOpen, onClose, onFinish, onChangeImg, fileList, form}) => {

    const STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
    const url = `http://${STORAGE_BUCKET}`;
    const { categories } = useGetCategories();



    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };



    const uploadImage = async (options:any) => {

        const { onSuccess, onError, file } = options;
        const fmData = new FormData();
        fmData.append("image", file);

        const option:RequestInit = {
            mode: 'no-cors',
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-type': "multipart/form-data",
            },
            referrerPolicy: "no-referrer",
            body: fmData,
        }


        try {
            const response = await fetch(url, option)  
            onSuccess("Ok");
        } catch (err) {
            const error = new Error("Some error");
            onError({ error });
        }
    }





    return (
        <Drawer
            title="Create a new recipe"
            className="ant-drawer-content-wrapper"
            style={{width: '100%', maxWidth: 780}}
            onClose={onClose}
            open={onOpen}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <Form 
                layout="vertical" 
                onFinish={onFinish}
                name='form'
                form={form}
            >
                <Row>
                    <Col>
                        <Form.Item>
                            <Button 
                                type="primary"
                                htmlType="submit"
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={16}>
                        <Form.Item
                            name="recipeName"
                            label="Recipe Name"
                            rules={[{ required: true, message: 'Enter the recipe name' }]}
                        >
                            <Input placeholder="Enter the recipe name"/>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item 
                            label="Recipe image" 

                            name="fileList"
                        >
                            <ImgCrop rotationSlider>
                                <Upload
                                    method="post"
                                    customRequest={uploadImage}
                                    action={url}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChangeImg}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 3 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={32} align="bottom" >
                    <Col span={16}>
                        <Form.Item
                            name="recipeCategory"
                            label="Category"
                            rules={[{ required: true, message: 'Please select a category' }]}
                        >
                            <Select placeholder="Please select a recipe category">

                                {categories && (
                                    categories.map((item:any) => (
                                        <Option value={item.name} key={item.id}>
                                            {item.name}
                                        </Option>

                                    ))
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={16} >
                         <Form.List
                            name="tags"
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names.length < 1) {
                                            return Promise.reject(new Error('At least 1 tag'));
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Tags' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please enter a tag or delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="tag" style={{ width: '50%' }} />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: '100%' }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add tag
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={16}>
                        <Form.List
                            name="ingredients"
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names.length < 2) {
                                            return Promise.reject(new Error('At least 2 ingredients '));
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Ingredient' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please enter an ingredient or delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="ingredient" style={{ width: '100%' }} />
                                            </Form.Item>
                                            {fields.length > 2 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: '100%' }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add ingredient
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Col>
                    <Col span={16}>
                        <Form.List
                            name="steps"
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names.length < 3) {
                                            return Promise.reject(new Error('At least 3 steps '));
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Cooking step' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                required: true,
                                                whitespace: true,
                                                message: "Please enter cooking steps or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                            >
                                            <Input placeholder="step" style={{ width: '100%' }} />
                                            </Form.Item>
                                            {fields.length > 3 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: '100%' }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add cooking steps
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={20}>
                        <Form.Item
                            name="recipeDescription"
                            label="Shot recipe description"
                            rules={[
                                {
                                    required: true,
                                    message: 'please enter a recipe description',
                                },
                            ]}
                        >
                            <Input.TextArea 
                                rows={4} 
                                placeholder="please enter a recipe description" 
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col  span={8}>
                        <Form.Item
                            name="recipeCalories"
                            label="Recipe calories"
                            rules={[
                                        {
                                            required: true,
                                            message: "Please enter this field.",
                                        },
                                    ]}
                                    >
                            <InputNumber min={2} max={9999} />
                        </Form.Item>
                        <Form.Item
                            name="recipeProtein"
                            label="Recipe protein"
                            rules={[
                                        {
                                            required: true,
                                            message: "Please enter this field.",
                                        },
                                    ]}
                                    >
                            <InputNumber min={2} max={999} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="recipeFat"
                            label="Recipe fat"
                            rules={[
                                        {
                                            required: true,
                                            message: "Please enter this field.",
                                        },
                                    ]}
                                    >
                            <InputNumber min={2} max={999} />
                        </Form.Item>
                        <Form.Item
                            name="recipeCarbohydrates"
                            label="Recipe carbohydrates"
                            rules={[
                                        {
                                            required: true,
                                            message: "Please enter this field.",
                                        },
                                    ]}
                            >
                            <InputNumber min={2} max={999} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
      </Drawer>
    )
}