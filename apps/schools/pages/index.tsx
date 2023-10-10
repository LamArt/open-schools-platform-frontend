import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import {ORGANIZATION_ID_STORAGE_NAME, useOrganization} from "@domains/organization/providers/organizationProvider";


const IndexPage = () => {
    const router = useRouter()
    const organization = useOrganization()

    useEffect(() => {
        localStorage.removeItem(ORGANIZATION_ID_STORAGE_NAME);
        router.push('/query')
    }, [organization, router])
    return <></>
}

export default IndexPage
