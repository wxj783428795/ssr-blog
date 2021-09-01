/*
 * @Author: wxj
 * @Date: 2021-08-31 10:39:34
 * @LastEditTime: 2021-09-01 17:01:41
 * @LastEditors: wxj
 * @Description:
 * @FilePath: \ssr-blog\web\components\articleForm\index.tsx
 */
import { TagsData } from "@/interface/tags-index";
import { Input, Form, Button, Upload, message, Modal, Tag, Space } from "antd";
import React, { FC } from "react";
import { useState } from "react";
import { CloseOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { getCookie } from "@/utils/utils";
import { useRef } from "react";
import { useEffect } from "react";
const { CheckableTag } = Tag;

type FormValues = {
    title: string;
};

const Index: FC<{ tags: TagsData | undefined }> = (props) => {
    const { tags } = { ...props };
    const [imageUrl, setimageUrl] = useState("");
    const [loading, setloading] = useState(false);
    const [previewVisible, setpreviewVisible] = useState(false);
    const [selectedTags, setselectedTags] = useState<{ id: string; name: string }[]>([]);
    const [inputVisible, setinputVisible] = useState(false);
    const saveInputRef = useRef<Input>(null);
    const [inputValue, setinputValue] = useState("");
    const [newTags, setnewTags] = useState<{ id: string; name: string }[]>([]);
    const beforeUpload = (file: RcFile, FileList: RcFile[]) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("只能上传JPG或PNG文件!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("图片不能超过2MB!");
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === "uploading") {
            setloading(true);
            return;
        }
        if (info.file.status === "done") {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setloading(false);
                setimageUrl(reader.result as string);
            });
            reader.readAsDataURL(info.file.originFileObj as RcFile);
        }
    };

    const handleInputConfirm: React.FocusEventHandler<HTMLInputElement> = (e) => {
        if (inputValue) {
            if (
                tags?.tagsData?.data.some((item) => item.name === inputValue) ||
                newTags.some((item) => item.name === inputValue)
            ) {
                message.warn(`新标签名 ${inputValue} 与已有标签名重复`);
            } else {
                setnewTags([...newTags, { id: new Date().valueOf().toString(), name: inputValue }]);
            }
        }
        setinputVisible(false);
    };

    //input显示后，自动聚焦
    useEffect(() => {
        if (inputVisible) {
            saveInputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleFinish = (values: FormValues) => {
        console.log(`values`, values);
    };

    return (
        <div>
            <Form<FormValues>
                name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                initialValues={{ remember: true }}
                onFinish={handleFinish}
            >
                <Form.Item label="标题" name="title">
                    <Input placeholder="请输入标题" />
                </Form.Item>
                <Form.Item label="封面" name="cover">
                    <Upload
                        action={`/api/postimage?_csrf=${getCookie("csrfToken")}`}
                        method="post"
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        fileList={
                            imageUrl
                                ? [
                                      {
                                          uid: "-1",
                                          name: "image.png",
                                          status: "done",
                                          url: imageUrl,
                                      },
                                  ]
                                : undefined
                        }
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        onPreview={(e) => setpreviewVisible(true)}
                        onRemove={(e) => setimageUrl("")}
                    >
                        {imageUrl ? null : (
                            <div>
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>点击上传</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item label="标签">
                    {tags?.tagsData?.data.map((item) => (
                        <CheckableTag
                            style={{ border: "1px solid #eeeeee" }}
                            checked={selectedTags.map((item) => item.id).includes(item.id)}
                            key={item.id}
                            onChange={(checked) => {
                                const nextSelectedTags = !checked
                                    ? [...selectedTags.filter((t) => t.id !== item.id)]
                                    : [...selectedTags, { id: item.id, name: item.name }];
                                setselectedTags(nextSelectedTags);
                            }}
                        >
                            {item.name}
                        </CheckableTag>
                    ))}
                    {newTags.map((item) => (
                        <CheckableTag
                            style={{ border: "1px solid #eeeeee" }}
                            checked={selectedTags.map((tag) => tag.id).includes(item.id)}
                            key={item.id}
                            onChange={(checked) => {
                                const nextSelectedTags = !checked
                                    ? [...selectedTags.filter((t) => t.id !== item.id)]
                                    : [...selectedTags, { id: item.id, name: item.name }];
                                setselectedTags(nextSelectedTags);
                            }}
                        >
                            <div className="flex justify-center items-center">
                                {item.name}{" "}
                                <CloseOutlined
                                    className=" ml-2"
                                    onClick={(e) => {
                                        setnewTags([
                                            ...newTags.filter((tag) => tag.id !== item.id),
                                        ]);
                                        setselectedTags([
                                            ...selectedTags.filter((tag) => tag.id !== item.id),
                                        ]);
                                    }}
                                />
                            </div>
                        </CheckableTag>
                    ))}
                    {inputVisible && (
                        <Input
                            ref={saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: "64px" }}
                            value={inputValue}
                            onChange={(e) => setinputValue(e.target.value)}
                            onBlur={handleInputConfirm}
                            // onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag
                            onClick={(e) => {
                                setinputVisible(true);
                            }}
                        >
                            <div className="flex justify-center items-center">
                                <PlusOutlined /> 新增标签
                            </div>
                        </Tag>
                    )}
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        发布博客
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={(e) => setpreviewVisible(false)}
            >
                <img alt="img" style={{ width: "100%" }} src={imageUrl} />
            </Modal>
        </div>
    );
};

export default Index;
