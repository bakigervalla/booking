import React, { useState } from 'react'
import * as moment from "moment";

const HistoryOrderLines = ({ text }) => {
  const [showOrderLines, setShowOrderLines] = useState(false)

  const formattedText = text
    ? text.replace('["', '').replace('"]', '').split('","').join('<br />')
    : ''

  return (
    <React.Fragment>
      {showOrderLines && <div dangerouslySetInnerHTML={{ __html: formattedText }} />}
      <button className='secondary-button-small'
        onClick={(e) => {
          e.preventDefault()
          setShowOrderLines(!showOrderLines)
        }}
      >
        {showOrderLines ? 'Skjul ordrelinjer' : 'Vis ordrelinjer'}
      </button>
    </React.Fragment>
  )
}

const descending = (a, b) => (a.invoice_date < b.invoice_date ? 1 : -1)

const History = ({ history }) => {
  history = history.reverse()

  return (
    <div className='box' style={{ borderTop: 'none' }}>
      {history.length > 0 &&
        history.sort(descending).map((h, i) => (
          <div className='history-item' key={`history-${i}`}>
            <div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>Faktura dato</div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>
              <time>{moment(h.invoice_date).format('DD.MM.YY')}</time>
              </div>
            </div>
            <div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>Faktura nr.</div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>{h.invoice_no}</div>
            </div>
            <div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>Ordre type</div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>{h.order_type}</div>
            </div>
            <div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>Kilometerstand</div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>{h.mileage}</div>
            </div>
            <div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>Ordrelinjer</div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>
                <HistoryOrderLines text={h.text} />
              </div>
            </div>
            <div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>Verksted</div>
              <div style={{ padding: '0.3rem 0 0.3rem 0' }}>{h.workshop_name}</div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default History
