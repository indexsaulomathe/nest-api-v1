export const getWelcomeMessage = (
  statusObjects: { status: 'online' | 'offline' | 'error'; service: string }[],
): string => {
  let style = '';

  const welcomeMessages = statusObjects.map(({ status, service }) => {
    let statusClass = '';
    let statusColor = '';
    if (status === 'online') {
      statusClass = 'online';
      statusColor = 'green';
    } else if (status === 'offline') {
      statusClass = 'offline';
      statusColor = 'red';
    } else {
      statusClass = 'error';
      statusColor = 'orange';
    }

    style += `
      .status.${statusClass} {
        border: 2px solid ${statusColor}; /* Borda com base na cor do status */
        background-color: ${statusColor}; /* Cor de fundo com base no status */
      }
    `;

    return `
          <div class="status-container">
            <p class="service">${service}:</p>
            <p class="status ${statusClass}">${status ? status.toUpperCase() : ''}</p>
          </div>
    `;
  });

  const welcomeHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Aero Busca</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f4f4f4;
            }
            .logo {
                text-align: center;
            }
            .logo img {
                width: 300px;
                height: auto;
            }
            .status-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            .status {
                color: white;
                font-weight: bold;
                padding: 3px 10px;
                border-radius: 5px;
                text-transform: uppercase;
                font-size: 0.8em;
            }
            .service {
                font-weight: bold;
                text-transform: uppercase;
                font-size: 1em;
                padding-right: 5px;
                margin: 0;
            }
            ${style}
        </style>
    </head>
    <body>
    <div class="logo">
          <img src="/public/logo.svg" alt="Logo da API Aero Busca">
          <h1>API Aero Busca</h1>
          ${welcomeMessages.join('')}
      </div>
    </body>
    </html>
  `;
  return welcomeHtml;
};
