import './centeredIndicator.css'

const CenteredIndicator = ({ message, loader }) => {
  return (
    <div className='message'>
      {loader?
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>:
        message
      }
    </div>
  )
}

export default CenteredIndicator
