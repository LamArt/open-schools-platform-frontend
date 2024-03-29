import { message } from 'antd'
import { successDeleteMsg } from '@domains/common/constants/deleteModal'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'
import router from 'next/router'
import React from 'react'

export async function handleDeleteButtonClick(
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    mutation: any,
    urlAfterDelete: string,
    dataField: string,
) {
    const uuid = getUuidFromUrl()

    if (uuid === null) return
    const mutationData = { [dataField]: uuid[0] }
    let response = await mutation(mutationData)

    if (!('error' in response)) {
        setIsModalVisible(false)
        message.success(successDeleteMsg)
        router.push(urlAfterDelete)
    }
}
