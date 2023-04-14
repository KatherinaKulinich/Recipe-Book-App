import { Button, Col, Divider, Form, FormInstance, FormProps, Input, Modal, Row, Space, Typography } from "antd"
import { useEffect, useRef } from "react";
import { Recipe, RecipeComponentUser, RecipeSection} from "../../types";
import { FiEdit } from 'react-icons/Fi'
const { Title } = Typography

type Item = RecipeSection | RecipeComponentUser;
type NewType = any;

interface ModalForEditingProps {
    onCloseModal: () => void;
    onSaveChanges: (values: any) => void;
    isModalOpen: boolean;
    recipeToEdit: Recipe;
    form: FormInstance<NewType>;
}



export const ModalForEditing:React.FC<ModalForEditingProps> = ({onCloseModal,  onSaveChanges, isModalOpen, recipeToEdit, form}) => {
   
    const { name, description, instructions, sections} = recipeToEdit;
    const instructionsValues = instructions.map((item) => item.display_text)
    const sectionsValues = sections.map((item:any) => item.components.raw_text)

    

    useEffect(() => {
        form.setFieldsValue({
            recipeDescription: description,
            recipeIngredients: sectionsValues,
            recipeInstructions: instructionsValues,
        })
    }, [form, description, sectionsValues, instructionsValues])

    


    return (
        <Modal 
            open={isModalOpen} 
            onCancel={onCloseModal}
            className='editingModal'
            footer={null}
            forceRender
        >
            <Divider plain>
                <Space 
                    align="baseline" 
                    size="middle" 
                    style={{ display: 'flex' }}
                >
                    <FiEdit/>
                    <span>
                        Recipe editing
                    </span>
                </Space>
            </Divider>
            <Row 
                gutter={24} 
                justify='center' 
            >
                <Col>
                    <Title level={1}>
                        {name}
                    </Title>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form
                        layout="vertical"
                        onFinish={onSaveChanges}
                        name='editingForm'
                        form={form}
                    >
                        <Space direction="vertical" size={'large'} style={{display: 'flex'}}>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Title level={5}>
                                        Recipe description:
                                    </Title>
                                    <Form.Item
                                        name={'recipeDescription'}
                                        initialValue={description}
                                        style={{width: '100%'}}
                                    >
                                        <Input width={'100%'}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 6]}>
                                <Col xs={24} lg={12}>
                                    <Title level={5}>
                                        Recipe ingredients:
                                    </Title>
                                    <Form.List
                                        name='recipeIngredients'
                                        initialValue={sectionsValues}
                                    >
                                        {(sections) => (
                                            <div>
                                                {sections.map((item) => (
                                                    <Form.Item
                                                        {...item}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                ))}
                                            </div>
                                        )}
                                    </Form.List>
                                </Col>
                                <Col xs={24} lg={12}>
                                    <Title level={5}>
                                        Recipe instructions:
                                    </Title>
                                    <Form.List
                                        name='recipeInstructions'
                                        initialValue={instructionsValues}
                                    >
                                        {(sections) => (
                                            <div>
                                                {sections.map((item) => (
                                                    <Form.Item
                                                        {...item}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                ))}
                                            </div>
                                        )}
                                    </Form.List>
                                </Col>
                            </Row>
                            <Row 
                                gutter={24} 
                                justify='center'
                            >
                                <Col>
                                    <Form.Item>
                                        <Button 
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Save changes
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}