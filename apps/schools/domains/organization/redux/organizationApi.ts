import { commonApi } from '../../../store/commonApi'
import { ReturnedData } from '../../common/redux/interfaces'
import {
    createOrganizationData,
    AllOrganizationsData,
    GetOrganizationSender,
    UpdateOrganizationInviteEmployee,
    StudentJoinCircleData,
    AllStudentsData,
    StudentData,
    TeacherData,
    DeleteOrganizationData,
    AnalyticsData,
    CreateOrganizationInviteEmployee,
    ExportStudentsData,
    AllQueriesData,
    AllTeachersData,
    AllQueriesOfOrganizationData,
    GetTeacher, GetStudentJoinCircle, GetOrganizationInviteEmployee, GetStudent, GetQueryStatus, GetAnalytics,
} from './interfaces'
import { GetEmployee } from '../../employee/redux/interfaces'

const organizationApi = commonApi.injectEndpoints({
    endpoints: build => ({
        getAllOrganizations: build.query<ReturnedData<GetOrganizationSender>, AllOrganizationsData>({
            query: (data) => ({
                url: '/organization-management/organizations',
                method: 'GET',
                body: data,
            }),
        }),
        createOrganization: build.mutation<{ 'creator_employee': GetEmployee }, createOrganizationData>({
            query: (data) => ({
                url: '/organization-management/organizations',
                method: 'POST',
                body: data,
            }),
        }),
        updateInviteEmployee: build.mutation<{ query: GetOrganizationInviteEmployee }, UpdateOrganizationInviteEmployee>({
            query: (data) => ({
                url: '/organization-management/organizations/invite-employee',
                method: 'PATCH',
                body: data,
            }),
        }),
        studentJoinCircle: build.query<{ results: GetStudentJoinCircle }, StudentJoinCircleData>({
            query: (data) => ({
                url: '/organization-management/organizations/student-join-circle-query',
                method: 'GET',
                body: data,
            }),
        }),
        getAllStudents: build.query<{ results: GetStudent }, AllStudentsData>({
            query: (data) => ({
                url: '/organization-management/organizations/students',
                method: 'GET',
                body: data,
            }),
        }),
        getStudent: build.query<{ student: GetStudent }, StudentData>({
            query: (data) => ({
                url: `/organization-management/organizations/students/${data.student_id}`,
                method: 'GET',
                body: data,
            }),
        }),
        getTeacher: build.query<{ teacher: GetTeacher }, TeacherData>({
            query: (data) => ({
                url: `/organization-management/organizations/teachers/${data.teacher_id}`,
                method: 'GET',
                body: data,
            }),
        }),
        deleteOrganization: build.query<{}, DeleteOrganizationData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}`,
                method: 'DELETE',
                body: data,
            }),
        }),
        analytics: build.query<{ analytics: GetAnalytics }, AnalyticsData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/analytics`,
                method: 'GET',
                body: data,
            }),
        }),
        inviteEmployee: build.mutation<{ query: GetQueryStatus }, CreateOrganizationInviteEmployee>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/invite-employee`,
                method: 'POST',
                body: data,
            }),
        }),
        getAllQueries: build.query<{ results: GetOrganizationInviteEmployee }, AllQueriesData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/invite-employee-queries`,
                method: 'GET',
                body: data,
            }),
        }),
        exportStudents: build.query<{ file: File }, ExportStudentsData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/students/export`,
                method: 'GET',
                body: data,
            }),
        }),
        getAllTeachers: build.query<ReturnedData<GetTeacher>, AllTeachersData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/teachers`,
                method: 'GET',
                body: data,
            }),
        }),
        getAllQueriesOfOrganization: build.query<ReturnedData<GetStudentJoinCircle>, AllQueriesOfOrganizationData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization}/student-profiles/${data.student_profile}/queries`,
                method: 'GET',
                body: data,
            }),
        }),
    }),
})

export const {
    useGetAllOrganizationsQuery,
    useCreateOrganizationMutation,
    useUpdateInviteEmployeeMutation,
    useStudentJoinCircleQuery,
    useGetAllStudentsQuery,
    useGetStudentQuery,
    useGetTeacherQuery,
    useDeleteOrganizationQuery,
    useAnalyticsQuery,
    useInviteEmployeeMutation,
    useGetAllQueriesQuery,
    useExportStudentsQuery,
    useGetAllTeachersQuery,
    useGetAllQueriesOfOrganizationQuery,
} = organizationApi