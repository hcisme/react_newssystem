import React from 'react'
import { Button } from 'antd'
import NewsPublish from '../../../components/publish-manage/NewsPublish.jsx'
import usePublish from '../../../components/publish-manage/usePublish.js'

export default function Published() {
  const { dataSource, handleSunset } = usePublish(2)

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button
            danger
            onClick={() => {
              handleSunset(id)
            }}
          >
            下线
          </Button>
        )}
      ></NewsPublish>
    </div>
  )
}
