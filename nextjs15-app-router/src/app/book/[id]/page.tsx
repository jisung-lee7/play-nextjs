import ClientComponent from '@/components/client-component'

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  console.log(id)
  return (
    <div>
      book/[id] page {id}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  )
}
