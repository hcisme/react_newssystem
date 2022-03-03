import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Tag, notification } from 'antd'

export default function List() {
  let navigate = useNavigate()
  const [dataSource, setDataSource] = useState([])

  const auditList = () => {
    React.$api.auditList().then((val) => {
      setDataSource(val)
    })
  }

  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title, item) => {
        return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        return <div>{category.title}</div>
      },
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render: (auditState) => {
        const colorList = ['', 'orange', 'green', 'red']
        const auditList = ['草稿箱', '审核中', '已通过', '未通过']
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      },
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            {item.auditState === 1 && (
              <Button
                onClick={() => {
                  handleRervert(item)
                }}
              >
                撤销
              </Button>
            )}
            {item.auditState === 2 && (
              <Button
                danger
                onClick={() => {
                  handlepublish(item)
                }}
              >
                发布
              </Button>
            )}
            {item.auditState === 3 && (
              <Button
                type="primary"
                onClick={() => {
                  handleUpdate(item)
                }}
              >
                更新
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  const handleRervert = (item) => {
    React.$api.handleRervert(item).then((val) => {
      notification.info({
        message: '通知',
        description: `您可以到草稿箱中中查看您的新闻`,
        placement: 'topRight',
      })
      auditList()
    })
  }

  const handleUpdate = (item) => {
    navigate(`/news-manage/update/${item.id}`)
  }

  const handlepublish = (item) => {
    React.$api.publish(item.id).then((val) => {
      navigate('/publish-manage/published')
      notification.info({
        message: '通知',
        description: `您可以到【发布管理/已经发布】 中查看您的新闻`,
        placement: 'topRight',
      })
    })
  }

  useEffect(() => {
    auditList()
  }, [])

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey={(item) => item.id}
      />
    </div>
  )
}
