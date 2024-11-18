import ClientComponent from '@/components/client-component'

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ q: string }>
}) {
  const { q } = await searchParams
  console.log(q)
  return (
    <div>
      Search page {q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  )
}
