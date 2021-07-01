import CrmMessageProps from './crm-message-props'

export default function CrmGenericMessage({ message }: CrmMessageProps) {
  return (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{message}</p>
    </div>
  )
}