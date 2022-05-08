import React from 'react'
import { Form } from 'antd'
import TitleForm from './TitleForm'

const FormWraper: React.FC<{
  onFinish: (errorInfo: any) => void
  onFinishFailed?: (errorInfo: any) => void
  title?: string
  description?: string
}> = ({ title = '', onFinish, children, onFinishFailed, description = '' }) => {
  const [form] = Form.useForm()
  return (
    <figure
      style={{
        background: '#F0F2F5',
        borderRadius: '20px',
        margin: '0 -3em',
        maxWidth: 'calc(468px + 6rem)',
      }}
    >
      <Form
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={(el) => {
          form.resetFields()
          onFinish(el)
        }}
        onFinishFailed={onFinishFailed}
        style={{ position: 'relative', maxWidth: '468px', margin: '3em 3em' }}
      >
        {title ? (
          <div style={{ marginBottom: '1em' }}>
            <TitleForm title={title} description={description} />
          </div>
        ) : (
          ''
        )}
        {children}
      </Form>
    </figure>
  )
}

export default FormWraper
