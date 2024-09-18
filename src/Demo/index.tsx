import React, { useState } from 'react'
import { createForm, ObjectField as ObjectFieldType } from '@formily/core'
import {
  FormProvider,
  Field,
  FormConsumer,
  useField,
  useFieldSchema,
  observer,
  ISchema,
  RecursionField,
} from '@formily/react'
import { Button, Input as AntdInput, Space, Tabs, Badge } from 'antd';
import { FormItem, Input, ArrayCards, ArrayTabs } from '@formily/antd'
import { createSchemaField } from '@formily/react'

import '@formily/antd/dist/antd.css';
import 'antd/dist/antd.css';

interface IFeedbackBadgeProps {
  name: string
}

const FeedbackBadge: React.FC<IFeedbackBadgeProps> = observer(
  (props) => {
    const field = useField<ObjectFieldType>()

    const errors = field.errors.filter((error) =>
      error.address?.includes(`${field.address}.${props.name}`)
    )

    const content = (
      <Space>
        {props.name}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            field.removeProperty(props.name);
          }}
        >
          删除
        </Button>
      </Space>
    );

    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {content}
        </Badge>
      );
    }
    return content;
  },
  {
    scheduler(request) {
      requestAnimationFrame(request)
    },
  }
)

const ObjectComponent = observer((props) => {
  const field = useField<ObjectFieldType>();
  const schema = useFieldSchema();

  const keys = Object.keys(field.value || {});
  const [activeKey, setActiveKey] = useState(`tab-${keys[0]}`)

  return (
    <>
      <pre>
        {JSON.stringify(field.value, null, 2)}
      </pre>
      <Space>
        <Field
          name='PROPERTY_NAME'
          basePath={''}
          required
          component={[AntdInput, { placeholder: '属性' }]}
        />
        <Button
          onClick={() => {
            const name = form.values['PROPERTY_NAME']
            if (name && !form.existValuesIn(`${field.path}.${name}`)) {
              field.addProperty(name, {})
              setActiveKey(`tab-${name}`)
              form.deleteValuesIn('PROPERTY_NAME')
            }
          }}
        >
          添加
        </Button>
      </Space>

      <div style={{ height: 20 }}/>

      <Tabs
        {...props}
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key)
        }}
        tabPosition="left"
      >
        {keys?.map((item, index) => {
          const key = `tab-${item}`
          const items = Array.isArray(schema.items)
            ? schema.items[index]
            : schema.items

          return (
            <Tabs.TabPane
              key={key}
              forceRender
              tab={<FeedbackBadge name={item} />}
            >
              <h1>{item}</h1>
              <RecursionField schema={items!} name={item} />
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </>
  )
})

const SchemaField = createSchemaField({
  components: {
    ObjectComponent,
    Input,
    FormItem,
    ArrayCards,
    ArrayTabs,
  },
  scope: {
  },
})

const formSchema: ISchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      'x-component': 'ObjectComponent',
      items: {
        type: 'object',
        properties: {
          list: {
            type: 'array',
            default: [],
            'x-component': 'ArrayTabs',
            'x-decorator': 'FormItem',
            'x-component-props': {
              type: 'line',
              tabPosition: 'left',
              min: 0,
              tabBarStyle: {
                width: '300px',
              },
            },
            items: {
              type: 'object',
              properties: {
                name: {
                  title: '名称',
                  type: 'string',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
          },
        },
      },
    }
  },
}

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <Button onClick={() => { form.validate() }}>validate</Button>
      <SchemaField schema={formSchema} />
      {/* <FormConsumer>{(form) => form.values.input}</FormConsumer> */}
    </FormProvider>
  )
}
