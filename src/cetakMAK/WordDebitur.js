import moment from "moment";

const formatLabel = (key = "") =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const normalizeDateValue = (value) => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (moment.isMoment(value)) {
    return value.isValid() ? value.toDate() : null;
  }

  if (typeof value === "object") {
    if (value.$d instanceof Date) {
      return Number.isNaN(value.$d.getTime()) ? null : value.$d;
    }

    if (value._d instanceof Date) {
      return Number.isNaN(value._d.getTime()) ? null : value._d;
    }

    return null;
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = moment(value, [moment.ISO_8601, "DD-MM-YYYY", "YYYY-MM-DD"], true);
    return parsed.isValid() ? parsed.toDate() : null;
  }

  return null;
};

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const normalizedDate = normalizeDateValue(value);
  if (normalizedDate) {
    return moment(normalizedDate).format("DD-MM-YYYY");
  }

  if (typeof value === "boolean") {
    return value ? "Ya" : "Tidak";
  }

  return String(value);
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isImageString = (value) =>
  typeof value === "string" &&
  (value.startsWith("data:image/") ||
    /^https?:\/\/.+/i.test(value) ||
    /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(value));

const isImageObject = (value) =>
  value &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  isImageString(value.url);

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const convertImageUrlToDataUrl = async (url) => {
  if (!isImageString(url)) {
    return url;
  }

  if (url.startsWith("data:image/")) {
    return url;
  }

  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      return url;
    }
    const blob = await response.blob();
    return await blobToDataUrl(blob);
  } catch (error) {
    console.error("Gagal memuat gambar untuk export Word:", url, error);
    return url;
  }
};

const resolveImages = async (value) => {
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => resolveImages(item)));
  }

  if (isImageString(value)) {
    return convertImageUrlToDataUrl(value);
  }

  if (value && typeof value === "object") {
    const entries = await Promise.all(
      Object.entries(value).map(async ([key, nestedValue]) => {
        if (key === "url" && isImageString(nestedValue)) {
          return [key, await convertImageUrlToDataUrl(nestedValue)];
        }
        return [key, await resolveImages(nestedValue)];
      })
    );

    return Object.fromEntries(entries);
  }

  return value;
};

const renderPhotoCard = (item, index) => `
  <div class="photo-card">
    <img src="${escapeHtml(item.url)}" alt="Lampiran ${index + 1}" />
    ${
      item.description
        ? `<div class="photo-desc">${escapeHtml(item.description)}</div>`
        : ""
    }
  </div>
`;

const renderArray = (key, value) => {
  if (!value.length) {
    return `
      <div class="section">
        <h3>${escapeHtml(formatLabel(key))}</h3>
        <p>-</p>
      </div>
    `;
  }

  if (value.every((item) => isImageObject(item))) {
    return `
      <div class="section">
        <h3>${escapeHtml(formatLabel(key))}</h3>
        <div class="photo-grid">
          ${value.map((item, index) => renderPhotoCard(item, index)).join("")}
        </div>
      </div>
    `;
  }

  if (value.every((item) => isImageString(item))) {
    return `
      <div class="section">
        <h3>${escapeHtml(formatLabel(key))}</h3>
        <div class="photo-grid">
          ${value
            .map(
              (item, index) => `
                <div class="photo-card">
                  <img src="${escapeHtml(item)}" alt="Lampiran ${index + 1}" />
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  if (value.every((item) => item && typeof item === "object" && !Array.isArray(item))) {
    const columnSet = Array.from(
      value.reduce((set, item) => {
        Object.keys(item).forEach((column) => {
          if (column !== "url") {
            set.add(column);
          }
        });
        return set;
      }, new Set())
    );

    const hasImageColumn = value.some((item) => isImageString(item.url));

    return `
      <div class="section">
        <h3>${escapeHtml(formatLabel(key))}</h3>
        <table>
          <thead>
            <tr>
              ${hasImageColumn ? "<th>Gambar</th>" : ""}
              ${columnSet
                .map((column) => `<th>${escapeHtml(formatLabel(column))}</th>`)
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${value
              .map(
                (item) => `
                  <tr>
                    ${
                      hasImageColumn
                        ? `<td>${
                            isImageString(item.url)
                              ? `<img class="table-image" src="${escapeHtml(item.url)}" alt="Lampiran" />`
                              : "-"
                          }</td>`
                        : ""
                    }
                    ${columnSet
                      .map((column) => `<td>${escapeHtml(formatValue(item[column]))}</td>`)
                      .join("")}
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  return `
    <div class="section">
      <h3>${escapeHtml(formatLabel(key))}</h3>
      <ul>
        ${value.map((item) => `<li>${escapeHtml(formatValue(item))}</li>`).join("")}
      </ul>
    </div>
  `;
};

const renderObject = (data) => {
  const primitiveRows = [];
  const nestedSections = [];

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      nestedSections.push(renderArray(key, value));
      return;
    }

    if (isImageObject(value)) {
      nestedSections.push(`
        <div class="section">
          <h3>${escapeHtml(formatLabel(key))}</h3>
          ${renderPhotoCard(value, 0)}
        </div>
      `);
      return;
    }

    if (value && typeof value === "object") {
      nestedSections.push(`
        <div class="section">
          <h3>${escapeHtml(formatLabel(key))}</h3>
          ${renderObject(value)}
        </div>
      `);
      return;
    }

    if (isImageString(value)) {
      nestedSections.push(`
        <div class="section">
          <h3>${escapeHtml(formatLabel(key))}</h3>
          <div class="photo-card">
            <img src="${escapeHtml(value)}" alt="${escapeHtml(formatLabel(key))}" />
          </div>
        </div>
      `);
      return;
    }

    primitiveRows.push(`
      <tr>
        <td class="label">${escapeHtml(formatLabel(key))}</td>
        <td>${escapeHtml(formatValue(value))}</td>
      </tr>
    `);
  });

  return `
    ${
      primitiveRows.length
        ? `
          <table>
            <tbody>
              ${primitiveRows.join("")}
            </tbody>
          </table>
        `
        : ""
    }
    ${nestedSections.join("")}
  `;
};

export const handleExportToWord = async (selectedData) => {
  if (!selectedData) {
    alert("No data available to export.");
    return;
  }

  const resolvedData = await resolveImages(selectedData);
  const fileName = `${resolvedData?.nomorMak || "MAK_Form"}.doc`;
  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8" />
        <title>MAK Export</title>
        <style>
          body {
            font-family: Calibri, Arial, sans-serif;
            color: #222;
            margin: 24px;
            font-size: 11pt;
          }
          h1, h2, h3 {
            color: #800000;
            margin-bottom: 8px;
          }
          .meta {
            margin-bottom: 18px;
          }
          .section {
            margin-top: 18px;
            page-break-inside: avoid;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }
          th, td {
            border: 1px solid #999;
            padding: 6px 8px;
            vertical-align: top;
          }
          th {
            background: #f1e3e3;
          }
          .label {
            width: 28%;
            font-weight: 600;
            background: #faf5f5;
          }
          ul {
            margin: 8px 0 0 18px;
            padding: 0;
          }
          .photo-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 8px;
          }
          .photo-card {
            display: inline-block;
            width: 280px;
            margin-top: 8px;
            border: 1px solid #bbb;
            padding: 8px;
            background: #fff;
          }
          .photo-desc {
            margin-top: 6px;
            font-size: 10pt;
          }
          img {
            width: 1cm;
            height: 1cm;
            object-fit: contain;
          }
          .table-image {
            width: 1cm;
            height: 1cm;
          }
        </style>
      </head>
      <body>
        <h1>Memo Analisa Kredit</h1>
        <div class="meta">
          <strong>Nomor MAK:</strong> ${escapeHtml(formatValue(resolvedData.nomorMak))}<br/>
          <strong>Nama Debitur:</strong> ${escapeHtml(formatValue(resolvedData.namaDebitur))}<br/>
          <strong>Tanggal MAK:</strong> ${escapeHtml(formatValue(resolvedData.tanggalMak))}
        </div>
        ${renderObject(resolvedData)}
      </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", htmlContent], {
    type: "application/msword",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
