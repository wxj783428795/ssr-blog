/*
 * @Author: wxj
 * @Date: 2021-08-31 10:39:34
 * @LastEditTime: 2021-09-01 15:26:08
 * @LastEditors: wxj
 * @Description:
 * @FilePath: \ssr-blog\web\components\articleForm\index.tsx
 */
import { TagsData } from "@/interface/tags-index";
import { Input, Form, Button, Upload, message, Modal, Tag } from "antd";
import React, { FC } from "react";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { getCookie } from "@/utils/utils";
import Item from "antd/lib/list/Item";
const { CheckableTag } = Tag;
const Index: FC<{ tags: TagsData | undefined }> = (props) => {
    const { tags } = { ...props };
    const [imageUrl, setimageUrl] = useState("");
    const [loading, setloading] = useState(false);
    const [previewVisible, setpreviewVisible] = useState(false);
    const [selectedTags, setselectedTags] = useState<string[]>([]);
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
    console.log(`selectedTags`, selectedTags);
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                initialValues={{ remember: true }}
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

                <Form.Item label="标签" name="tags">
                    {tags?.tagsData?.data.map((item) => (
                        <CheckableTag
                            checked={selectedTags.includes(item.id)}
                            key={item.id}
                            onChange={(checked) => {
                                const nextSelectedTags = !checked
                                    ? [...selectedTags.filter((t) => t !== item.id)]
                                    : [...selectedTags, item.id];
                                setselectedTags(nextSelectedTags);
                            }}
                        >
                            {item.name}
                        </CheckableTag>
                    ))}
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
