let DEFAULT_RELEVANCE = typeof __INJECT_LIBRARY_JSON__ !== 'undefined' ? __INJECT_LIBRARY_JSON__ : {};
let DICTIONARY = typeof __INJECT_INSPECTORS_JSON__ !== 'undefined' ? __INJECT_INSPECTORS_JSON__ : { contexts: {} };

const noDataSVG = `
    <div class="no-data-wrapper">
        <svg viewBox="0 0 240 173" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_317_10062" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="173"><path d="M240 0.5H0V172.5H240V0.5Z" fill="white"/></mask>
            <g mask="url(#mask0_317_10062)">
            <path d="M181.099 121.15C174.059 121.15 168.359 126.83 168.359 133.84C168.359 140.85 174.059 146.53 181.099 146.53C188.139 146.53 193.839 140.85 193.839 133.84C193.839 126.83 188.139 121.15 181.099 121.15ZM181.099 145.39C174.689 145.39 169.499 140.22 169.499 133.84C169.499 127.46 174.689 122.29 181.099 122.29C187.509 122.29 192.699 127.46 192.699 133.84C192.699 140.22 187.509 145.39 181.099 145.39Z" fill="#0057C7"/>
            <path d="M181.09 118.79C172.75 118.79 165.98 125.53 165.98 133.84C165.98 142.15 172.75 148.89 181.09 148.89C189.43 148.89 196.2 142.15 196.2 133.84C196.2 125.53 189.43 118.79 181.09 118.79ZM181.09 147.71C173.4 147.71 167.16 141.5 167.16 133.84C167.16 126.18 173.4 119.97 181.09 119.97C188.78 119.97 195.02 126.18 195.02 133.84C195.02 141.5 188.78 147.71 181.09 147.71Z" fill="#3C91FF"/>
            <path d="M231.271 122.99L231.651 118.01L232.031 122.99C232.131 124.36 233.221 125.44 234.591 125.54L239.591 125.92L234.591 126.3C233.211 126.4 232.131 127.49 232.031 128.85L231.651 133.83L231.271 128.85C231.171 127.48 230.081 126.4 228.711 126.3L223.711 125.92L228.711 125.54C230.091 125.44 231.171 124.35 231.271 122.99Z" fill="#0057C7"/>
            <path d="M37.0295 84.3701C32.7495 84.0501 29.3495 80.6601 29.0195 76.3901L27.8395 60.8301L26.6595 76.3901C26.3395 80.6501 22.9295 84.0401 18.6495 84.3701L3.01953 85.5501L18.6495 86.7301C22.9295 87.0501 26.3295 90.4401 26.6595 94.7101L27.8395 110.27L29.0195 94.7101C29.3395 90.4501 32.7495 87.0601 37.0295 86.7301L52.6595 85.5501L37.0295 84.3701ZM30.5595 86.5301C29.7695 86.8401 29.1295 87.4701 28.8195 88.2601L27.8395 90.7501L26.8595 88.2601C26.5495 87.4701 25.9195 86.8401 25.1195 86.5301L22.6195 85.5501L25.1195 84.5701C25.9095 84.2601 26.5495 83.6301 26.8595 82.8401L27.8395 80.3501L28.8195 82.8401C29.1295 83.6301 29.7595 84.2601 30.5595 84.5701L33.0595 85.5501L30.5595 86.5301Z" fill="#3C91FF"/>
            <path d="M143.289 129.08C146.149 129.08 148.469 131.39 148.469 134.24C148.469 137.09 146.149 139.4 143.289 139.4C140.429 139.4 138.109 137.09 138.109 134.24C138.109 131.39 140.429 129.08 143.289 129.08Z" fill="#CDE1F4"/>
            <path d="M138.4 85.4297C139.77 85.4297 140.87 86.5297 140.87 87.8897C140.87 89.2497 139.77 90.3497 138.4 90.3497C137.03 90.3497 135.93 89.2497 135.93 87.8897C135.93 86.5297 137.03 85.4297 138.4 85.4297Z" fill="#3C91FF"/>
            <path d="M50.1887 167.58C51.5587 167.58 52.6587 168.68 52.6587 170.04C52.6587 171.4 51.5587 172.5 50.1887 172.5C48.8187 172.5 47.7188 171.4 47.7188 170.04C47.7188 168.68 48.8187 167.58 50.1887 167.58Z" fill="#3C91FF"/>
            <path d="M112.759 141.87C114.109 141.87 115.209 142.96 115.209 144.31C115.209 145.66 114.109 146.75 112.759 146.75C111.409 146.75 110.309 145.66 110.309 144.31C110.309 142.96 111.399 141.87 112.759 141.87Z" fill="#3C91FF"/>
            <path d="M43.0084 112.49C43.7584 112.49 44.3684 111.89 44.3684 111.14C44.3684 110.39 43.7584 109.79 43.0084 109.79C42.2584 109.79 41.6484 110.39 41.6484 111.14C41.6484 111.89 42.2584 112.49 43.0084 112.49Z" fill="#3C91FF"/>
            <path d="M64.6878 60.1398C65.7478 60.1398 66.6178 59.2798 66.6178 58.2198C66.6178 57.1598 65.7578 56.2998 64.6878 56.2998C63.6178 56.2998 62.7578 57.1598 62.7578 58.2198C62.7578 59.2798 63.6178 60.1398 64.6878 60.1398Z" fill="#3C91FF"/>
            <path d="M94.7313 100.45C94.7313 101.33 94.0212 102.04 93.1312 102.04C92.2412 102.04 91.5312 101.33 91.5312 100.45C91.5312 99.5703 92.2412 98.8604 93.1312 98.8604C94.0212 98.8604 94.7313 99.5703 94.7313 100.45Z" fill="#3C91FF"/>
            <path d="M141.29 99.4698C141.29 100.23 140.67 100.85 139.9 100.85C139.13 100.85 138.52 100.23 138.52 99.4698C138.52 98.7098 139.14 98.0898 139.9 98.0898C140.66 98.0898 141.29 98.7098 141.29 99.4698Z" fill="#3C91FF"/>
            <path d="M167.691 70.3C168.591 70.3 169.331 69.57 169.331 68.67C169.331 67.77 168.601 67.04 167.691 67.04C166.781 67.04 166.051 67.77 166.051 68.67C166.051 69.57 166.781 70.3 167.691 70.3Z" fill="#CDE1F4"/>
            <path d="M209.91 81.6702C210.95 81.6702 211.8 80.8302 211.8 79.7902C211.8 78.7502 210.95 77.9102 209.91 77.9102C208.87 77.9102 208.02 78.7502 208.02 79.7902C208.02 80.8302 208.87 81.6702 209.91 81.6702Z" fill="#3C91FF"/>
            <path d="M77.6595 8.17016C78.6995 8.17016 79.5495 7.33016 79.5495 6.29016C79.5495 5.25016 78.6995 4.41016 77.6595 4.41016C76.6195 4.41016 75.7695 5.25016 75.7695 6.29016C75.7695 7.33016 76.6195 8.17016 77.6595 8.17016Z" fill="#CDE1F4"/>
            <path d="M237.829 84.4398C237.829 85.3698 237.079 86.1198 236.139 86.1198C235.199 86.1198 234.449 85.3698 234.449 84.4398C234.449 83.5098 235.199 82.7598 236.139 82.7598C237.079 82.7598 237.829 83.5098 237.829 84.4398Z" fill="#3C91FF"/>
            <path d="M233.568 31.7505C233.568 32.6805 232.808 33.4405 231.868 33.4405C230.928 33.4405 230.168 32.6805 230.168 31.7505C230.168 30.8205 230.928 30.0605 231.868 30.0605C232.808 30.0605 233.568 30.8205 233.568 31.7505Z" fill="#3C91FF"/>
            </g>
            <path d="M125.16 20.6802C108.56 32.6102 97.3496 45.3702 100.12 49.2102C102.89 53.0402 118.6 46.4702 135.21 34.5502C151.81 22.6302 163.03 9.86018 160.25 6.03018C157.48 2.20018 141.77 8.77018 125.17 20.6902L125.16 20.6802ZM133.92 32.7802C118.6 43.7802 104.28 50.0802 101.95 46.8502C99.6096 43.6202 110.13 32.0802 125.45 21.0802C140.77 10.0802 155.09 3.78018 157.42 7.01018C159.76 10.2402 149.24 21.7802 133.92 32.7802Z" fill="#0057C7"/>
            <path d="M132.78 31.2096C138.12 27.3796 143.02 23.3596 146.97 19.6096C146.5 18.6396 145.94 17.6796 145.29 16.7796C139.27 8.4696 127.63 6.5996 119.29 12.5896C110.95 18.5796 109.06 30.1696 115.08 38.4796C115.73 39.3896 116.47 40.2196 117.25 40.9696C122.07 38.4196 127.45 35.0496 132.79 31.2196L132.78 31.2096Z" fill="#3C91FF"/>
            <path d="M136.35 36.1204C132.74 38.7104 127.94 41.8704 122.93 44.7004C128.72 47.1304 135.62 46.5904 141.08 42.6604C146.56 38.7304 149.25 32.3904 148.75 26.1504C144.48 29.9804 139.94 33.5304 136.33 36.1204H136.35Z" fill="#3C91FF"/>
        </svg>
        <div class="no-data-text">No Data Available</div>
    </div>
`;

let cmEditor;

const SMARTSENSE_HINTS = [
    "version", "name", "id", "size", "sha256", "exists", "type",
    "value", "values", "keys", "subkeys", "string value",
    "bes computers", "bes properties", "bes actions", "bes fixlets",
    "operating system", "computer name", "ip address", "cpu", "ram",
    "free space", "total space", "architecture", "platform",
    "service pack", "build number", "release", "version number",
    "running services", "service running", "registry key",
    "file", "folder", "pathname", "parent folder", "modification time",
    "creation time", "size of", "number of lines of", "lines of",
    "selects", "elements", "item", "first", "last", "number of items",
    "it", "whose", "as string", "as integer", "as boolean", "as version",
    "as date", "as time", "it as string", "item 0 of", "item 1 of"
];

const Sys = {
    toggleDrop: (id, e) => {
        e.stopPropagation();
        document.querySelectorAll('.dropdown-menu').forEach(m => { if(m.id!==id) m.classList.remove('show'); });
        document.getElementById(id).classList.toggle('show');
    },

    Studio: {
        currentMode: 'Client Relevance',
        currentName: 'BigFix Client Relevance',
        switchMode: (mode, name, event) => {
            document.querySelectorAll('.ctx-item').forEach(el => el.classList.remove('active'));
            event.target.classList.add('active');
            // SEC-FIX: build context-btn using DOM APIs instead of innerHTML to prevent XSS
            const ctxBtn = document.getElementById('context-btn');
            ctxBtn.textContent = '';
            const nameSpan = document.createTextNode(name);
            const caret = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            caret.setAttribute('class', 'context-selector-caret');
            caret.setAttribute('viewBox', '0 0 16 16');
            caret.setAttribute('width', '16');
            caret.setAttribute('height', '16');
            caret.setAttribute('fill', 'none');
            caret.setAttribute('stroke', 'currentColor');
            caret.setAttribute('stroke-width', '2');
            const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            poly.setAttribute('points', '4 6 8 10 12 6');
            caret.appendChild(poly);
            ctxBtn.appendChild(nameSpan);
            ctxBtn.appendChild(caret);
            
            const modeMap = {
                'client-relevance': 'Client Relevance',
                'session-relevance': 'Session Relevance',
                'action-script': 'Action Script'
            };
            
            Sys.Studio.currentMode = modeMap[mode] || 'Client Relevance';
            Sys.Studio.currentName = name;
            
            Sys.Library.renderItems(document.getElementById("lib-search-input").value.trim());
            
            Sys.Util.toast(`Switched context to ${name}`);
            document.getElementById('context-drop').classList.remove('show');
        }
    },

    Autocomplete: {
        init: () => {
            CodeMirror.registerHelper("hint", "bigfix", function(editor, options) {
                const cursor = editor.getCursor();
                const line = editor.getLine(cursor.line);
                let textBefore = line.substring(0, cursor.ch);

                // Find where the current phrase started by looking for boundaries
                let lastOf = textBefore.toLowerCase().lastIndexOf(" of ");
                let boundaries = ["(", ")", ",", ";", "=", "<", ">", "+", "-", "|", "&"];
                
                let boundaryIndex = -1;
                for (let b of boundaries) {
                    boundaryIndex = Math.max(boundaryIndex, textBefore.lastIndexOf(b));
                }
                // Check if the word " of " is the most recent boundary
                boundaryIndex = Math.max(boundaryIndex, lastOf !== -1 ? lastOf + 3 : -1);

                let start = boundaryIndex === -1 ? 0 : boundaryIndex + 1;
                
                // Skip any leading spaces immediately after a boundary
                while (start < cursor.ch && line[start] === ' ') { 
                    start++; 
                }

                // This safely captures multi-word phrases like "service name"
                let currentWord = line.substring(start, cursor.ch).toLowerCase();
                let end = cursor.ch;

                // Get the syntax rules for the active tab (e.g., "Client Relevance")
                const activeContext = DICTIONARY.contexts ? DICTIONARY.contexts[Sys.Studio.currentMode] : null;
                if (!activeContext) return null;

                let suggestions = [];

                // Extract Objects and Properties
                if (activeContext.objects) {
                    Object.keys(activeContext.objects).forEach(objName => {
                        const objData = activeContext.objects[objName];
                        suggestions.push({ text: objName, displayText: objName, type: "object", desc: objData.description });
                        
                        if (objData.plural) {
                            suggestions.push({ text: objData.plural, displayText: objData.plural, type: "object" });
                        }

                        if (objData.properties) {
                            objData.properties.forEach(prop => {
                                suggestions.push({ text: prop.name, displayText: prop.name, type: "property", returns: prop.returns });
                            });
                        }
                    });
                }

                // Extract Action Script commands
                if (activeContext.commands) {
                    Object.keys(activeContext.commands).forEach(cmdName => {
                        suggestions.push({ text: cmdName, displayText: cmdName, type: "command", desc: activeContext.commands[cmdName].description });
                    });
                }

                // Add standard keywords
                SMARTSENSE_HINTS.forEach(hint => {
                    suggestions.push({ text: hint, displayText: hint, type: "keyword" });
                });

                // Remove duplicates and filter by typing
                let uniqueSuggestions = Array.from(new Set(suggestions.map(s => s.text)))
                    .map(text => suggestions.find(s => s.text === text));

                let matchedList = uniqueSuggestions.filter(item => item.text.toLowerCase().includes(currentWord));

                matchedList.sort((a, b) => {
                    const aStarts = a.text.toLowerCase().startsWith(currentWord);
                    const bStarts = b.text.toLowerCase().startsWith(currentWord);
                    if (aStarts && !bStarts) return -1;
                    if (!aStarts && bStarts) return 1;
                    return a.text.localeCompare(b.text);
                });

                // Custom Renderer
                matchedList = matchedList.map(item => {
                    item.render = function(element, self, data) {
                        const wrapper = document.createElement("div");
                        wrapper.style.display = "flex";
                        wrapper.style.justifyContent = "space-between";
                        wrapper.style.alignItems = "center";
                        wrapper.style.width = "100%";
                        wrapper.style.gap = "32px";
                        wrapper.style.fontFamily = "var(--mono, monospace)";
                        wrapper.style.fontSize = "13px";

                        const leftSide = document.createElement("div");
                        
                        let color = "#9cdcfe"; let icon = "⚿";
                        if (data.type === "object") { color = "#4ec9b0"; icon = "⭓"; }
                        if (data.type === "property") { color = "#ce9178"; icon = "⭍"; }
                        if (data.type === "command") { color = "#c586c0"; icon = "⚡"; }

                        // SEC-FIX: use DOM APIs so displayText (from internal dictionary) is never parsed as HTML
                        const iconSpan = document.createElement('span');
                        iconSpan.style.color = color;
                        iconSpan.style.marginRight = '8px';
                        iconSpan.style.fontSize = '14px';
                        iconSpan.textContent = icon;
                        leftSide.appendChild(iconSpan);
                        leftSide.appendChild(document.createTextNode(' ' + data.displayText));
                        wrapper.appendChild(leftSide);

                        if (data.returns) {
                            const rightSide = document.createElement("span");
                            rightSide.style.color = "var(--text-secondary, #6b7280)";
                            rightSide.style.fontSize = "11px";
                            rightSide.innerText = data.returns;
                            wrapper.appendChild(rightSide);
                        }
                        element.appendChild(wrapper);
                    };
                    return item;
                });

                return {
                    list: matchedList.slice(0, 50), // Cap at 50 to prevent UI lag
                    from: CodeMirror.Pos(cursor.line, start),
                    to: CodeMirror.Pos(cursor.line, end)
                };
            });
        }
    },

    Library: {
        customSnippets: [],
        queryHistory: [],

        init: () => {
            document.addEventListener('click', e => {
                if(!e.target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
                }
            });

            // SEC-FIX: validate localStorage reads; treat stored data as untrusted
            const _rawCustom = localStorage.getItem("qna_custom");
            try {
                const _parsed = JSON.parse(_rawCustom || "[]");
                Sys.Library.customSnippets = Array.isArray(_parsed)
                    ? _parsed.filter(item =>
                        item && typeof item.id === 'number' &&
                        typeof item.title === 'string' &&
                        typeof item.code === 'string'
                    )
                    : [];
            } catch (_e) { Sys.Library.customSnippets = []; }

            const _rawHistory = localStorage.getItem("qna_history");
            try {
                const _parsed = JSON.parse(_rawHistory || "[]");
                Sys.Library.queryHistory = Array.isArray(_parsed)
                    ? _parsed.filter(item =>
                        item && typeof item.timestamp === 'number' &&
                        typeof item.code === 'string'
                    )
                    : [];
            } catch (_e) { Sys.Library.queryHistory = []; }

            const tenDaysAgo = Date.now() - (10 * 24 * 60 * 60 * 1000);
            Sys.Library.queryHistory = Sys.Library.queryHistory.filter(h => h.timestamp && h.timestamp >= tenDaysAgo);

            // Initialize the autocomplete engine
            Sys.Autocomplete.init();

            cmEditor = CodeMirror(document.getElementById('qna-editor-wrapper'), {
                lineNumbers: true,
                mode: "text/plain",
                theme: "default",
                styleActiveLine: true,
                matchBrackets: true,
                lineWrapping: true,
                // Tell CodeMirror to use our new BigFix engine
                hintOptions: { hint: CodeMirror.hint.bigfix, completeSingle: false },
                extraKeys: {
                    "Ctrl-Enter": function(cm) { Sys.QNA.evaluate(); },
                    "Ctrl-Space": "autocomplete" // Trigger manually with Ctrl+Space
                }
            });

            // Save state to local storage
            cmEditor.on("change", (cm, change) => {
                const _code = cm.getValue();
                if (typeof _code === 'string') {
                    localStorage.setItem("qna_saved_code", _code.slice(0, 500000));
                }
            });

            // Trigger autocomplete automatically while typing
            cmEditor.on("inputRead", function(cm, change) {
                if (change.origin !== "+input" || change.text.length > 1) return;
                
                const char = change.text[0];
                if (/[a-zA-Z\s\.]/.test(char)) {
                    setTimeout(() => {
                        if (!cm.state.completionActive) {
                            cm.showHint({ completeSingle: false });
                        }
                    }, 100); // 100ms delay makes it feel smooth
                }
            });

            const explainBtn = document.createElement("button");
            explainBtn.className = "btn-explain";
            explainBtn.title = "Explain with SmartSense AI Assistant";

            explainBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z"/>
                <rect x="9" y="19" width="6" height="2" rx="1"/>
            </svg>
            `;

            explainBtn.onclick = () => Sys.Chat.explainSelection();

            document
            .querySelector("#editor-pane .panel-header-actions")
            .prepend(explainBtn);

            explainBtn.style.display = "none";

            cmEditor.on("change", () => {
                explainBtn.style.display =
                    cmEditor.getValue().trim() ? "inline-flex" : "none";
            });

            // SEC-FIX: savedCode goes into CodeMirror via setValue (plain text), not innerHTML — safe
            try {
                const savedCode = localStorage.getItem("qna_saved_code");
                if (savedCode && typeof savedCode === 'string') { cmEditor.setValue(savedCode); }
            } catch (_e) { /* ignore corrupt saved code */ }

            const chatInput = document.getElementById('chat-input');
            chatInput.addEventListener('input', function() {
                this.style.height = '36px';
                if (this.scrollHeight > 36) {
                    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
                    this.style.overflowY = this.scrollHeight > 120 ? 'auto' : 'hidden';
                } else {
                    this.style.overflowY = 'hidden';
                }
            });

            Sys.Library.renderItems();
            document.getElementById("qna-results").innerHTML = noDataSVG; // SEC-NOTE: noDataSVG is a hardcoded constant — no user data
        },

        filter: () => {
            const query = document.getElementById("lib-search-input").value.trim();
            document.getElementById("search-clear-btn").style.display = query ? "block" : "none";
            Sys.Library.renderItems(query);
        },

        clearSearch: () => {
            document.getElementById("lib-search-input").value = "";
            Sys.Library.filter();
            document.getElementById("lib-search-input").focus();
        },

        expandAll: () => {
            document.querySelectorAll('.master-acc').forEach(el => el.classList.add('active'));
            document.querySelectorAll('.acc-group').forEach(el => el.classList.add('active'));
        },
        collapseAll: () => {
            document.querySelectorAll('.master-acc').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.acc-group').forEach(el => el.classList.remove('active'));
        },

        saveSnippet: () => {
            const code = Sys.Util.flattenCode(cmEditor.getValue());
            if(!code) return Sys.Util.toast("Editor is empty!");

            // Inject Custom Modal if it doesn't exist yet
            if (!document.getElementById("custom-bm-modal")) {
                // SEC-FIX: build modal via DOM APIs instead of insertAdjacentHTML
                const _modal = document.createElement('div');
                _modal.id = 'custom-bm-modal';
                _modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:9999; display:none; align-items:center; justify-content:center;';
                const _inner = document.createElement('div');
                _inner.style.cssText = 'background:var(--bg-panel, #fff); padding:20px; border-radius:8px; width:320px; box-shadow:0 10px 25px rgba(0,0,0,0.15); font-family:\'Inter\', sans-serif;';
                const _h3 = document.createElement('h3');
                _h3.style.cssText = 'margin:0 0 16px 0; font-size:16px; color:var(--text-main, #111827);';
                _h3.textContent = 'Save to Bookmarks';
                const _d1 = document.createElement('div'); _d1.style.marginBottom = '12px';
                const _l1 = document.createElement('label'); _l1.style.cssText = 'display:block; font-size:12px; margin-bottom:4px; color:var(--text-secondary, #4B5563);'; _l1.textContent = 'Title';
                const _i1 = document.createElement('input'); _i1.type = 'text'; _i1.id = 'custom-bm-title'; _i1.style.cssText = 'width:100%; box-sizing:border-box; padding:8px; border:1px solid var(--border-light, #D1D5DB); border-radius:4px; outline:none; font-family:\'Inter\';'; _i1.placeholder = 'e.g., Get OS Info';
                _d1.appendChild(_l1); _d1.appendChild(_i1);
                const _d2 = document.createElement('div'); _d2.style.marginBottom = '20px';
                const _l2 = document.createElement('label'); _l2.style.cssText = 'display:block; font-size:12px; margin-bottom:4px; color:var(--text-secondary, #4B5563);'; _l2.textContent = 'Description (Optional)';
                const _i2 = document.createElement('input'); _i2.type = 'text'; _i2.id = 'custom-bm-desc'; _i2.style.cssText = 'width:100%; box-sizing:border-box; padding:8px; border:1px solid var(--border-light, #D1D5DB); border-radius:4px; outline:none; font-family:\'Inter\';'; _i2.placeholder = 'Brief details...';
                _d2.appendChild(_l2); _d2.appendChild(_i2);
                const _dBtn = document.createElement('div'); _dBtn.style.cssText = 'display:flex; justify-content:flex-end; gap:8px;';
                const _bCancel = document.createElement('button'); _bCancel.id = 'custom-bm-cancel'; _bCancel.className = 'btn btn-outline'; _bCancel.style.cssText = 'cursor:pointer; padding:6px 14px;'; _bCancel.textContent = 'Cancel';
                const _bSave = document.createElement('button'); _bSave.id = 'custom-bm-save'; _bSave.className = 'btn btn-primary'; _bSave.style.cssText = 'cursor:pointer; padding:6px 14px;'; _bSave.textContent = 'Save';
                _dBtn.appendChild(_bCancel); _dBtn.appendChild(_bSave);
                _inner.appendChild(_h3); _inner.appendChild(_d1); _inner.appendChild(_d2); _inner.appendChild(_dBtn);
                _modal.appendChild(_inner);
                document.body.appendChild(_modal);
            }

            const modal = document.getElementById("custom-bm-modal");
            const titleInput = document.getElementById("custom-bm-title");
            const descInput = document.getElementById("custom-bm-desc");
            const saveBtn = document.getElementById("custom-bm-save");
            const cancelBtn = document.getElementById("custom-bm-cancel");

            // Reset fields and show modal
            titleInput.value = "";
            descInput.value = "";
            titleInput.style.borderColor = "var(--border-light, #D1D5DB)";
            modal.style.display = "flex";
            titleInput.focus();

            const closeModal = () => { modal.style.display = "none"; };

            // Clone buttons to remove old event listeners (prevents multi-saving if clicked multiple times over session)
            const newSaveBtn = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
            const newCancelBtn = cancelBtn.cloneNode(true);
            cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

            // Bind actions
            newCancelBtn.onclick = closeModal;
            
            newSaveBtn.onclick = () => {
                const title = titleInput.value.trim();
                if (!title) {
                    titleInput.style.borderColor = "var(--status-red, red)";
                    titleInput.focus();
                    return; // Title is required
                }

                const desc = descInput.value.trim();

                // Save Logic
                Sys.Library.customSnippets.push({ id: Date.now(), title, desc, code, mode: Sys.Studio.currentMode });
                const _safeSnippets = Sys.Library.customSnippets.map(s => ({
                    id: typeof s.id === 'number' ? s.id : 0,
                    title: String(s.title || "").slice(0, 200),
                    desc: String(s.desc || "").slice(0, 500),
                    code: String(s.code || ""),
                    mode: String(s.mode || "")
                }));
                localStorage.setItem("qna_custom", JSON.stringify(_safeSnippets));
                Sys.Library.renderItems(document.getElementById("lib-search-input").value.trim());
                Sys.Util.toast("Saved to My Bookmarks!");
                
                closeModal();
            };
        },

        deleteSnippet: (e, id) => {
            e.stopPropagation();
            Sys.Library.customSnippets = Sys.Library.customSnippets.filter(x => x.id !== id);
            const _safeSnippets = Sys.Library.customSnippets.map(s => ({
                id: typeof s.id === 'number' ? s.id : 0,
                title: String(s.title || "").slice(0, 200),
                desc: String(s.desc || "").slice(0, 500),
                code: String(s.code || ""),
                mode: String(s.mode || "")
            }));
            localStorage.setItem("qna_custom", JSON.stringify(_safeSnippets));
            Sys.Library.renderItems(document.getElementById("lib-search-input").value.trim());
        },

        addHistory: (code) => {
            code = Sys.Util.flattenCode(code);
            if(!code) return;

            const tenDaysAgo = Date.now() - (10 * 24 * 60 * 60 * 1000);
            Sys.Library.queryHistory = Sys.Library.queryHistory.filter(h => h.timestamp && h.timestamp >= tenDaysAgo);

            if(Sys.Library.queryHistory.length > 0 && Sys.Library.queryHistory[0].code === code && Sys.Library.queryHistory[0].mode === Sys.Studio.currentMode) return;

            const dateStr = new Date().toLocaleString('en-US', {
                year: 'numeric', month: 'short', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });

            Sys.Library.queryHistory.unshift({
                id: Date.now(),
                timestamp: Date.now(),
                title: code.substring(0, 30).replace(/\n/g, " ") + (code.length>30?"...":""),
                desc: dateStr,
                code: code,
                mode: Sys.Studio.currentMode
            });

            if(Sys.Library.queryHistory.length > 100) Sys.Library.queryHistory = Sys.Library.queryHistory.slice(0, 100);
            const _safeHistory = Sys.Library.queryHistory.map(h => ({
                id: typeof h.id === 'number' ? h.id : 0,
                timestamp: typeof h.timestamp === 'number' ? h.timestamp : 0,
                title: String(h.title || "").slice(0, 200),
                desc: String(h.desc || "").slice(0, 500),
                code: String(h.code || ""),
                mode: String(h.mode || "")
            }));
            localStorage.setItem("qna_history", JSON.stringify(_safeHistory));

            Sys.Library.renderItems(document.getElementById("lib-search-input").value.trim());
        },

        clearHistory: (e) => {
            e.stopPropagation();
            Sys.Library.queryHistory = Sys.Library.queryHistory.filter(h => {
                const itemMode = h.mode || 'Client Relevance';
                return itemMode !== Sys.Studio.currentMode;
            });
            const _safeHistory = Sys.Library.queryHistory.map(h => ({
                id: typeof h.id === 'number' ? h.id : 0,
                timestamp: typeof h.timestamp === 'number' ? h.timestamp : 0,
                title: String(h.title || "").slice(0, 200),
                desc: String(h.desc || "").slice(0, 500),
                code: String(h.code || ""),
                mode: String(h.mode || "")
            }));
            localStorage.setItem("qna_history", JSON.stringify(_safeHistory));
            Sys.Library.renderItems(document.getElementById("lib-search-input").value.trim());
        },

        toggleMaster: (id) => {
            const el = document.getElementById(`master-${id}`);
            if(el) el.classList.toggle('active');
        },
        toggleSub: (idx) => {
            const el = document.getElementById(`cat-${idx}`);
            if(el) el.classList.toggle("active");
        },

        renderItems: (query = "") => {
            const container = document.getElementById("lib-content");
            const lowerQ = query.toLowerCase();

            const currentScroll = container.scrollTop;
            const activeMasters = Array.from(container.querySelectorAll('.master-acc.active')).map(el => el.id);
            const activeGroups = Array.from(container.querySelectorAll('.acc-group.active')).map(el => el.id);
            const isInitialRender = container.innerHTML.trim() === "";

            const activeContextData = DEFAULT_RELEVANCE[Sys.Studio.currentMode] || {};

            let allRelHtml = "";
            if (Object.keys(activeContextData).length > 0) {
                allRelHtml = Object.keys(activeContextData).map((cat, catIdx) => {
                    const filteredItems = activeContextData[cat].filter(item =>
                        item.title.toLowerCase().includes(lowerQ) || item.desc.toLowerCase().includes(lowerQ) || item.code.toLowerCase().includes(lowerQ)
                    );
                    if (filteredItems.length === 0) return '';

                    let isActive = false;
                    if (query !== "") isActive = true;
                    else if (!isInitialRender) isActive = activeGroups.includes(`cat-${catIdx}`);
                    else isActive = false;

                    return `
                    <div class="acc-group ${isActive ? 'active' : ''}" id="cat-${catIdx}">
                        <div class="acc-header" onclick="Sys.Library.toggleSub(${catIdx})">
                            <span>${cat}</span>
                            <svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                        <div class="acc-items">
                            ${filteredItems.map(item => {
                                const cleanCode = Sys.Util.flattenCode(item.code);
                                return `
                                <div class="item-card" onclick="Sys.Library.loadEncoded('${encodeURIComponent(cleanCode).replace(/'/g, "%27")}')">
                                    <div class="item-title">
                                        <span style="flex: 1;">${Sys.Util.highlight(item.title, query)}</span>
                                        <button type="button" class="smartsense-btn" title="Explain with SmartSense AI Assistant" onclick="Sys.Chat.explainCode(event, '${encodeURIComponent(cleanCode).replace(/'/g, "%27")}')">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z"/>
                                                <rect x="9" y="19" width="6" height="2" rx="1"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="item-desc">${Sys.Util.highlight(item.desc, query)}</div>
                                    <div class="item-code">${Sys.Util.highlight(cleanCode, query)}</div>
                                </div>
                                `}).join("")}
                        </div>
                    </div>
                    `;
                }).join("");
            }

            let bmHtml = "";
            const bmFiltered = Sys.Library.customSnippets.filter(item => {
                const itemMode = item.mode || 'Client Relevance';
                if (itemMode !== Sys.Studio.currentMode) return false;
                return item.title.toLowerCase().includes(lowerQ) || item.desc.toLowerCase().includes(lowerQ) || item.code.toLowerCase().includes(lowerQ);
            });
            
            if(bmFiltered.length > 0) {
                bmHtml = bmFiltered.map(item => `
                    <div class="item-card card-bookmark" onclick="Sys.Library.loadEncoded('${encodeURIComponent(item.code).replace(/'/g, "%27")}')">
                        <div class="item-title" style="flex-direction:row; align-items:center;">
                            <span style="flex:1">${Sys.Util.highlight(item.title, query)}</span>
                            <button type="button" class="del-btn" title="Delete Bookmark" onclick="Sys.Library.deleteSnippet(event, ${item.id})">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                        ${item.desc ? `<div class="item-desc">${Sys.Util.highlight(item.desc, query)}</div>` : ''}
                        <div class="item-code">${Sys.Util.highlight(item.code, query)}</div>
                    </div>
                `).join("");
            } else if(query === "") {
                bmHtml = `<div style="padding:10px 20px; color:var(--text-secondary); font-size:12px;">No bookmarks added.</div>`;
            }

            let histHtml = "";
            const histFiltered = Sys.Library.queryHistory.filter(item => {
                const itemMode = item.mode || 'Client Relevance';
                if (itemMode !== Sys.Studio.currentMode) return false;
                return item.title.toLowerCase().includes(lowerQ) || item.code.toLowerCase().includes(lowerQ);
            });
            
            if(histFiltered.length > 0) {
                histHtml = `<div style="text-align:right; padding: 4px 12px 10px 12px;"><button type="button" class="btn btn-clear-hist" style="font-size:11px; padding:4px 8px;" onclick="Sys.Library.clearHistory(event)">Clear History</button></div>`;
                histHtml += histFiltered.map(item => `
                    <div class="item-card card-history" onclick="Sys.Library.loadEncoded('${encodeURIComponent(item.code).replace(/'/g, "%27")}')">
                        <div class="item-title" style="color:var(--text-secondary); font-family:var(--mono); font-size:11px; font-weight:400;">
                            <span style="flex:1">${Sys.Util.highlight(item.desc, query)}</span>
                        </div>
                        <div class="item-code" style="background:transparent; border:none; padding:0; margin-top:4px; margin-left:14px;">${Sys.Util.highlight(item.code, query)}</div>
                    </div>
                `).join("");
            } else if(query === "") {
                histHtml = `<div style="padding:10px 20px; color:var(--text-secondary); font-size:12px;">No recent history.</div>`;
            }

            const buildMasterAcc = (id, title, contentHtml, isDefaultActive) => {
                if(!contentHtml && query !== "") return "";

                let active = "";
                if (query !== "") active = "active";
                else if (!isInitialRender) active = activeMasters.includes(`master-${id}`) ? "active" : "";
                else active = isDefaultActive ? "active" : "";

                return `
                    <div class="master-acc ${active}" id="master-${id}">
                        <div class="acc-header" onclick="Sys.Library.toggleMaster('${id}')">
                            <span>${title}</span>
                            <svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                        <div class="acc-items">${contentHtml}</div>
                    </div>
                `;
            };

            // SEC-NOTE: all user-originated values (item.title, item.desc, item.code)
            // pass through Sys.Util.highlight() which calls escHTML() before HTML insertion.
            // The outer accordion structure uses only internal constants (IDs, CSS classes).
            container.innerHTML =
                buildMasterAcc('all', 'Library', allRelHtml, true) +
                buildMasterAcc('bm', 'My Bookmarks', bmHtml, false) +
                buildMasterAcc('hist', 'Recent History', histHtml, false);

            container.scrollTop = currentScroll;
        },

        loadEncoded: (encodedCode) => {
            let code = decodeURIComponent(encodedCode);
            code = Sys.Util.flattenCode(code);
            cmEditor.setValue(code);
            Sys.QNA.results = [];
            Sys.QNA.render();
            cmEditor.focus();
            Sys.Util.toast("Loaded query into editor.");
        }
    },

    QNA: {
        results: [],
        isEvaluating: false,

        evaluate: async (e) => {
            if (e) e.preventDefault();

            const raw = cmEditor.getValue().trim();
            
            if (!raw) {
                Sys.Util.toast("Please enter a relevance expression to evaluate.");
                return;
            }
            
            if (Sys.QNA.isEvaluating) return;

            const expressions = raw.split("\n").map(l => l.trim()).filter(Boolean);
            if (!expressions.length) return;

            Sys.QNA.isEvaluating = true;
            const btn = document.getElementById("btn-evaluate");
            const originalHtml = btn.innerHTML; 
            
            btn.innerHTML = '<span class="spinner" style="border-top-color: #fff; width: 14px; height: 14px; margin-right: 6px;"></span> Evaluating';
            btn.disabled = true;

            try {
                console.log("Sending evaluation request to backend...", expressions);
                const resp = await fetch("/evaluate", {
                    method: "POST", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify({ expressions })
                });
                
                if (!resp.ok) throw new Error(`HTTP Error: ${resp.status}`);
                
                const data = await resp.json();

                Sys.QNA.results = data.results.map((r, rIdx) => ({
                    id: 'res-' + rIdx,
                    expr: r.expr,
                    answers: r.error ? ["E: " + r.error] : r.answers,
                    isError: !!r.error || r.answers.length === 0,
                    elapsed: r.time_us ? (r.time_us / 1000).toFixed(1) + " ms" : "—"
                }));

                Sys.Library.addHistory(raw);
                document.getElementById("res-filter").value = "";
                Sys.QNA.render();
                Sys.Util.toast(`Evaluated ${expressions.length} expression(s).`);
                
            } catch (err) { 
                console.error("Evaluation failed:", err);
                Sys.Util.toast("Evaluation Server connection failed. Check console."); 
            } finally {
                Sys.QNA.isEvaluating = false;
                btn.innerHTML = originalHtml; // SEC-NOTE: originalHtml is captured from our own DOM, not user input
                btn.disabled = false;
            }
        },

        render: (rawQuery = "") => {
            const container = document.getElementById("qna-results");
            if (Sys.QNA.results.length === 0) {
                container.innerHTML = noDataSVG;
                return;
            }

            const esc = (s) => String(s)
                .replace(/\\/g, "\\\\")
                .replace(/'/g, "\\'")
                .replace(/"/g, "&quot;")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r");
            const query = rawQuery.trim().toLowerCase();

            let filteredResults = [];
            if (!query) {
                filteredResults = Sys.QNA.results;
            } else {
                Sys.QNA.results.forEach(r => {
                    const matchedAnswers = r.answers.filter(a => String(a).toLowerCase().includes(query));
                    if (matchedAnswers.length > 0) {
                        filteredResults.push({ ...r, answers: matchedAnswers });
                    }
                });
            }

            if(filteredResults.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding: 30px; color:var(--text-secondary); font-weight:500;">No answers matching "${Sys.Util.escHTML(rawQuery)}"</div>`;
                return;
            }

            container.innerHTML = filteredResults.map((r) => {
                return `
                <div class="result-tile ${r.isError ? 'error' : 'success'} ans-result-block" id="${r.id}">
                    <div class="res-header">
                        <span class="res-status ${r.isError ? 'error' : 'success'}">${r.isError ? 'ERROR' : 'SUCCESS'}</span>
                        <span class="res-time">${r.elapsed}</span>
                    </div>
                    <div class="res-query" onclick="Sys.Util.copyText(this, '${esc(r.expr)}')">
                        <div class="q-lbl">Q:</div>
                        <div class="q-val">${Sys.Util.escHTML(r.expr)}</div>
                    </div>
                    <div class="res-answers">
                        ${r.answers.map((a) => {
                            const strA = String(a);
                            const isErr = r.isError && strA.startsWith('E: ');
                            const valText = isErr ? strA.substring(3).trim() : strA;
                            const lblText = isErr ? 'E:' : 'A:';
                            const displayAns = query ? Sys.Util.highlight(valText, query) : Sys.Util.escHTML(valText);
                            return `
                            <div class="ans-row" onclick="Sys.Util.copyText(this, '${esc(valText)}')">
                                <div class="ans-lbl" style="${isErr ? 'color: var(--status-red);' : ''}">${lblText}</div>
                                <div class="ans-val ${isErr ? 'err' : ''}">${displayAns}</div>
                            </div>
                            `;
                        }).join("")}
                    </div>
                </div>
            `}).join("");
        },

        filterResults: () => {
            const query = document.getElementById("res-filter").value.trim().toLowerCase();
            document.getElementById("res-search-clear-btn").style.display = query ? "block" : "none";
            Sys.QNA.render(query);
        },

        clearSearch: () => {
            document.getElementById("res-filter").value = "";
            Sys.QNA.filterResults();
            document.getElementById("res-filter").focus();
        },

        clear: () => {
            cmEditor.setValue("");
            Sys.QNA.results = [];
            Sys.QNA.render();
            cmEditor.focus();
        }
    },

    Exp: {
        fmt: 'csv',
        setFmt: (f, el) => {
            Sys.Exp.fmt = f;
            document.querySelectorAll('.fmt-btn').forEach(b => b.classList.remove('active'));
            el.classList.add('active');
        },
        run: async (scope) => {
            // Close dropdown
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
            
            if (Sys.QNA.results.length === 0) return Sys.Util.toast("No results to export.");

            let dataToExport = Sys.QNA.results;

            // Handle "Search Results" scope
            if (scope === 'search') {
                const query = document.getElementById("res-filter").value.toLowerCase().trim();
                if (query) {
                    dataToExport = [];
                    Sys.QNA.results.forEach(r => {
                        const mAns = r.answers.filter(a => String(a).toLowerCase().includes(query));
                        if (mAns.length > 0) dataToExport.push({ ...r, answers: mAns });
                    });
                }
            }

            if (dataToExport.length === 0) return Sys.Util.toast("No matching results to export.");

            let content, filename, mime;

            // Format Generation
            if (Sys.Exp.fmt === "json") {
                content = JSON.stringify(dataToExport, null, 2);
                filename = "qna_results.json"; 
                mime = "application/json";
            } else if (Sys.Exp.fmt === "csv") {
                const rows = [["Expression", "Status", "Answer", "Time"]];
                dataToExport.forEach(r => r.answers.forEach(a => {
                    const isErr = r.isError && String(a).startsWith('E: ');
                    rows.push([
                        r.expr, 
                        r.isError ? "Error" : "Success", 
                        isErr ? String(a).substring(3).trim() : String(a), 
                        r.elapsed
                    ]);
                }));
                content = rows.map(e => e.map(String).map(v => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
                filename = "qna_results.csv"; 
                mime = "text/csv";
            } else if (Sys.Exp.fmt === "txt") {
                const rows = [["Expression", "Status", "Answer", "Time"].join('\t')];
                dataToExport.forEach(r => r.answers.forEach(a => {
                    const isErr = r.isError && String(a).startsWith('E: ');
                    rows.push([
                        r.expr, 
                        r.isError ? "Error" : "Success", 
                        isErr ? String(a).substring(3).trim() : String(a), 
                        r.elapsed
                    ].join('\t'));
                }));
                content = rows.join("\n"); 
                filename = "qna_results.txt"; 
                mime = "text/plain";
            } else if (Sys.Exp.fmt === "xml") {
                content = '<?xml version="1.0" encoding="UTF-8"?>\n<Results>\n';
                dataToExport.forEach(r => {
                    content += `  <Result>\n    <Expression>${Sys.Util.escHTML(r.expr)}</Expression>\n    <Status>${r.isError ? "Error" : "Success"}</Status>\n    <Time>${r.elapsed}</Time>\n    <Answers>\n`;
                    r.answers.forEach(a => {
                        const isErr = r.isError && String(a).startsWith('E: ');
                        content += `      <Answer>${Sys.Util.escHTML(isErr ? String(a).substring(3).trim() : String(a))}</Answer>\n`;
                    });
                    content += `    </Answers>\n  </Result>\n`;
                });
                content += '</Results>'; 
                filename = "qna_results.xml"; 
                mime = "application/xml";
            } else if (Sys.Exp.fmt === "html" || Sys.Exp.fmt === "pdf") {
                content = `<style>body{font-family:sans-serif;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;text-align:left;} th{background:#f4f5f7;}</style><h2>BigFix Ops Studio — Evaluation Results</h2><table><thead><tr><th>Expression</th><th>Status</th><th>Answer</th><th>Time</th></tr></thead><tbody>`;
                dataToExport.forEach(r => r.answers.forEach(a => {
                    const isErr = r.isError && String(a).startsWith('E: ');
                    content += `<tr><td>${Sys.Util.escHTML(r.expr)}</td><td>${r.isError ? 'Error' : 'Success'}</td><td>${Sys.Util.escHTML(isErr ? String(a).substring(3).trim() : String(a))}</td><td>${r.elapsed}</td></tr>`;
                }));
                content += '</tbody></table>';

                if (Sys.Exp.fmt === "html") {
                    filename = "qna_results.html"; 
                    mime = "text/html";
                } else {
                    // PDF Handling via Print Dialog
                    // SEC-FIX: avoid document.write; use Blob URL to open print window
                    const _printHtml = '<!DOCTYPE html><html><head><title>BigFix Ops Studio Report</title></head><body>' + content + '</body></html>';
                    const _printBlob = new Blob([_printHtml], { type: 'text/html' });
                    const _printUrl = URL.createObjectURL(_printBlob);
                    const w = window.open(_printUrl, '_blank');
                    setTimeout(() => { URL.revokeObjectURL(_printUrl); }, 60000);
                    if (w) { w.addEventListener('load', () => { w.focus(); setTimeout(() => { w.print(); }, 250); }); }
                    return;
                }
            }

            Sys.Util.toast(`Exporting queries...`);
            const blob = new Blob([content], { type: mime });

            // Save File Execution
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: filename,
                    types: [{
                        description: 'Export File',
                        accept: { [mime]: ['.' + Sys.Exp.fmt] },
                    }],
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                Sys.Util.toast("Export successful!");
                return;
            } catch (e) {
                // Fallback for browsers that don't support showSaveFilePicker or if user aborts
                if (e.name !== 'AbortError') {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }, 1000);
                }
            }
        }
    },

    Util: {
        escHTML: (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),

        flattenCode: (c) => (c || "").replace(/\r?\n|\r/g, ' ').replace(/\s{2,}/g, ' ').trim(),

        highlight: (text, query) => {
            let escText = Sys.Util.escHTML(text);
            if(!query) return escText;
            const escQuery = Sys.Util.escHTML(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escQuery})`, 'gi');
            return escText.replace(regex, '<span class="highlight">$1</span>');
        },

        toast: (msg) => {
            const c = document.getElementById('toast-container');
            const id = 'toast_'+Date.now();
            c.insertAdjacentHTML('beforeend', `<div class="toast" id="${id}"> ${msg}</div>`);
            const el = document.getElementById(id);
            setTimeout(()=>el.classList.add('show'), 10);
            setTimeout(()=>{
                el.classList.remove('show');
                setTimeout(()=>el.remove(), 300);
            }, 3000);
        },
        copyText: (el, text) => {
            navigator.clipboard.writeText(text).then(() => {
                Sys.Util.toast("Copied to clipboard!");
            }).catch(()=>{});
            el.classList.add("flash");
            setTimeout(() => el.classList.remove("flash"), 400);
        }
    },

    Chat: {
        history: [],
        loadToEditor: (code) => {
            cmEditor.setValue(code.trim());
            cmEditor.focus();
            Sys.Util.toast("Loaded into editor!");
        },
        
        explainSelection: () => {
            // Get highlighted text, or fallback to all text
            const code = cmEditor.getSelection() || cmEditor.getValue();
            if (!code.trim()) {
                Sys.Util.toast("Editor is empty. Nothing to explain.");
                return;
            }
            Sys.Chat.triggerExplain(code.trim());
        },
        toggle: () => {
            document.getElementById('chat-pane').classList.toggle('open');
        },
        explainCode: (e, encodedCode) => {
            e.stopPropagation(); // Prevents clicking the row from loading it into the editor
            let code = decodeURIComponent(encodedCode);
            code = Sys.Util.flattenCode(code);
            Sys.Chat.triggerExplain(code);
        },
        triggerExplain: (target) => {
            if (!target) {
                Sys.Util.toast("Nothing to explain.");
                return;
            }

            const prompt = `Explain in plain English what this ${Sys.Studio.currentName} expression does using SmartSense:\n\`\`\`\n${target}\n\`\`\``;

            if (!document.getElementById('chat-pane').classList.contains('open')) {
                document.getElementById('chat-pane').classList.add('open');
            }

            Sys.Chat.history.push({ role: "user", content: prompt });
            if (Sys.Chat.history.length > 20) {
                Sys.Chat.history = Sys.Chat.history.slice(-20);
            }

            Sys.Chat.appendMessage(
            `Explain below ${Sys.Studio.currentMode} expression(s):\n\n${target}`,
            'user'
            );

            const loadingId = 'loading-' + Date.now();
            Sys.Chat.appendMessage('<span class="spinner" style="border-top-color: var(--hcl-blue); border-width: 2px; width: 14px; height: 14px;"></span>', 'bot', loadingId);

            setTimeout(async () => {
                try {
                    const resp = await fetch("/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            message: prompt, 
                            history: Sys.Chat.history,
                            context: Sys.Studio.currentName // Sending context to backend
                        })
                    });

                    if (!resp.ok) throw new Error("HTTP " + resp.status);

                    const data = await resp.json();
                    const loader = document.getElementById(loadingId);
                    if (loader) loader.remove();

                    Sys.Chat.history.push({ role: "assistant", content: data.reply || "" });
                    Sys.Chat.appendMessage(data.reply || "No response received.", 'bot');
                } catch (err) {
                    const loader = document.getElementById(loadingId);
                    if (loader) loader.remove();
                    Sys.Chat.history.pop();
                    Sys.Chat.appendMessage("Error: Could not connect to AI Assistant.", 'bot');
                    Sys.Util.toast("AI Assistant connection failed.");
                }
            }, 50);
        },
        send: () => {
            const inputEl = document.getElementById('chat-input');
            const msg = inputEl.value.trim();
            if (!msg) return;

            inputEl.value = '';
            inputEl.style.height = 'auto';
            Sys.Chat.appendMessage(msg, 'user');

            Sys.Chat.history.push({ role: "user", content: msg });
            if (Sys.Chat.history.length > 20) {
                Sys.Chat.history = Sys.Chat.history.slice(-20);
            }

            const loadingId = 'loading-' + Date.now();
            Sys.Chat.appendMessage('<span class="spinner" style="border-top-color: var(--hcl-blue); border-width: 2px; width: 14px; height: 14px;"></span>', 'bot', loadingId);

            setTimeout(async () => {
                try {
                    const resp = await fetch("/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            message: msg, 
                            history: Sys.Chat.history,
                            context: Sys.Studio.currentName // Sending context to backend
                        })
                    });

                    if (!resp.ok) throw new Error("Server returned HTTP " + resp.status);

                    const data = await resp.json();
                    const loader = document.getElementById(loadingId);
                    if (loader) loader.remove();

                    Sys.Chat.history.push({ role: "assistant", content: data.reply || "" });
                    Sys.Chat.appendMessage(data.reply || "No response received.", 'bot');
                } catch (err) {
                    const loader = document.getElementById(loadingId);
                    if (loader) loader.remove();
                    Sys.Chat.history.pop();
                    Sys.Chat.appendMessage("Error: Could not connect to AI Assistant.", 'bot');
                    Sys.Util.toast("AI Assistant connection failed.");
                }
            }, 50);
        },
        appendMessage: (htmlContent, sender, id = '') => {
            try {
                const container = document.getElementById('chat-messages');
                const div = document.createElement('div');
                div.className = `chat-bubble ${sender}`;
                if (id) div.id = id;

                if (htmlContent.includes('class="spinner"')) {
                    // SEC-FIX: spinner HTML is a hardcoded internal string — safe, no user data
                    div.innerHTML = htmlContent;
                } else if (sender === 'bot') {
                    // SEC-FIX: renderMarkdown output is sanitised before insertion
                    // DOMPurify is loaded in index.html; fall back gracefully if not present
                    const _rendered = Sys.Chat.renderMarkdown(htmlContent);
                    div.innerHTML = (typeof DOMPurify !== 'undefined')
                        ? DOMPurify.sanitize(_rendered, { ADD_ATTR: ['onclick', 'target'] })
                        : _rendered;
                } else {
                    // User messages: plain-text escaped, no HTML allowed
                    div.innerHTML = Sys.Util.escHTML(htmlContent);
                }

                container.appendChild(div);
                container.scrollTop = container.scrollHeight;
            } catch (err) {
                console.error("Failed to append message:", err);
            }
        },
        renderMarkdown: (text) => {
            if (!text) return "";
            let processed = text;

            processed = processed.replace(/<thinking>[^]*?<\/thinking>/gi, '');

            const codeBlocks = [];
            const PLACEHOLDER = "CODEBLOCK_PLACEHOLDER_";

            processed = processed.replace(/```(\w*)\r?\n([^`]*(?:`(?!``)[^`]*)*)\r?\n```/g, (match, lang, code) => {
                const cleanCode = code.trim();
                const safePayload = encodeURIComponent(cleanCode).replace(/'/g, "%27");
                const displayCode = Sys.Util.escHTML(cleanCode);
                const idx = codeBlocks.length;
                codeBlocks.push(
                    `<div class="chat-code-block" onclick="Sys.Library.loadEncoded('${safePayload}')">${displayCode}</div>`
                );
                return `${PLACEHOLDER}${idx}__\n`;
            });

            processed = Sys.Util.escHTML(processed);

            // inline code headings
            processed = processed.replace(
                /^[ \t]*`([^`\r\n]+)`[ \t]*:?/gm,
                '<div class="explain-title"><code>$1</code></div>'
            );
            // bold
            processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            // italic
            processed = processed.replace(
                /(^|\s)\*(.*?)\*(?=\s|$)/g,
                '$1<em>$2</em>'
            );

            // links
            processed = processed.replace(
                /\[([^\]\r\n]{1,500}?)\]\(([^()\r\n]{1,2000}?)\)/g,
                (_, text, url) => {
                    const safeUrl = /^https?:\/\//i.test(url.trim()) ? url.trim() : '#';
                    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--hcl-blue);text-decoration:underline;">${text}</a>`;
                }
            );

            // bullet lists
            processed = processed.replace(/^[ \t]{0,20}[-*][ \t]{1,20}[^\r\n]{0,500}$/gm, (match) => {
                const items = match.trim().split('\n').map(line =>
                    `<li style="margin-bottom:4px; line-height:1.5;">${line.replace(/^\s*[\-\*]\s+/, '')}</li>`
                ).join('');
                return `<ul style="margin-left:24px;margin-bottom:12px;margin-top:8px;">${items}</ul>`;
            });

            // numbered relevance blocks
            processed = processed.replace(/^[ \t]{0,20}\d{1,6}\.[ \t]{1,20}[^\r\n]{0,500}$/gm, (match) => {
                const items = match.trim().split('\n').map(line =>
                    `<li style="margin-bottom:4px; line-height:1.5;">${line.replace(/^\s*\d+\.\s+/, '')}</li>`
                ).join('');
                return `<ol style="margin-left:24px;margin-bottom:12px;margin-top:8px;">${items}</ol>`;
            });

            // spacing between title and description
            processed = processed.replace(
                /<\/div>\n([^<])/g,
                '</div>\n\n$1'
            );

            // line breaks
            processed = processed.replace(/\n/g, "<br>");
            processed = processed.replace(/(<br>\s*){3,}/g, '<br><br>');

            // restore code blocks
            processed = processed.replace(
                new RegExp(`${PLACEHOLDER}(\\d+)__<br>`, 'g'),
                (_, i) => codeBlocks[parseInt(i)]
            );

            processed = processed.replace(
                new RegExp(`${PLACEHOLDER}(\\d+)__`, 'g'),
                (_, i) => codeBlocks[parseInt(i)]
            );

            return processed;
        }
    }
};

(function(){
    const hs = document.getElementById("sidebar-drag-horiz");
    const lp = document.getElementById("library-pane");
    let dragH = false, sx;
    hs.addEventListener("mousedown", e => { dragH=true; sx=e.clientX; document.body.style.cursor="col-resize"; });

    const vs = document.getElementById("drag-handle-vert");
    const ep = document.getElementById("editor-pane");
    let dragV = false, sy;
    vs.addEventListener("mousedown", e => { dragV=true; sy=e.clientY; document.body.style.cursor="row-resize"; });

    window.addEventListener("mousemove", e => {
        if(dragH) lp.style.width = Math.max(250, Math.min(600, e.clientX)) + "px";
        if(dragV) {
            const newH = ep.offsetHeight + (e.clientY - sy);
            ep.style.flex = `0 0 ${Math.max(100, newH)}px`;
            sy = e.clientY;
        }
    });
    window.addEventListener("mouseup", () => {
        dragH=false; dragV=false;
        document.body.style.cursor="";
    });
})();

window.onload = Sys.Library.init;
setInterval(() => {
    fetch('/ping').catch(() => {});
}, 2000);

// ── AI Settings Modal ─────────────────────────────────────────────────────────
// Allows switching AI provider and entering/updating API keys without restarting.
// Keys are persisted via Electron safeStorage (DPAPI) through window.providerSettings.
//
// UX rules:
//   - On open: load current provider + check if a key is already stored for it.
//   - If key exists: show masked preview (bullets + last 4 chars); key field is OPTIONAL.
//   - If no key stored: key field is REQUIRED.
//   - Changing the provider dropdown re-checks key status for the newly selected provider.
//   - Apply with empty key field + existing key = provider-switch-only (no key change).
//   - Apply with a value in key field = save new key + switch provider.
//
// Security: all DOM built with createElement/textContent — no innerHTML with user data.
(function () {

    const PROVIDERS = [
        { id: 'gemini',    label: 'Google Gemini',    keyName: 'GEMINI_API_KEY',    placeholder: 'AIza...' },
        { id: 'groq',      label: 'Groq',             keyName: 'GROQ_API_KEY',      placeholder: 'gsk_...' },
        { id: 'claude',    label: 'Anthropic Claude', keyName: 'ANTHROPIC_API_KEY', placeholder: 'sk-ant-...' },
    ];

    const _MODAL_ID = 'ai-settings-modal';

    // ── Helpers ───────────────────────────────────────────────────────────────

    function _setStatus(el, msg, type) {
        el.textContent = msg;
        el.style.color = type === 'ok'   ? '#16A34A'
                       : type === 'err'  ? '#DC2626'
                       : type === 'warn' ? '#D97706'
                       :                   '#6B7280';
    }

    // Returns { exists, masked } for the currently selected provider.
    // Works in Electron (via providerSettings.keyStatus) and browser/dev mode
    // (asks /config-status, which only tells us if the key is loaded, not its value).
    async function _getKeyStatus(providerId) {
        try {
            if (window.providerSettings && window.providerSettings.keyStatus) {
                return await window.providerSettings.keyStatus(providerId);
            }
            // Browser/dev fallback: /config-status only tells us if the active provider has a key loaded
            const data = await fetch('/config-status').then(r => r.json());
            const activeMatch = data && data.provider &&
                (data.provider === providerId || (data.provider === 'anthropic' && providerId === 'claude'));
            if (activeMatch && data.ready) {
                return { exists: true, masked: '(key loaded in session)' };
            }
        } catch (_) {}
        return { exists: false, masked: '' };
    }

    // ── Build modal (once, lazily) ────────────────────────────────────────────
    function _buildModal() {
        if (document.getElementById(_MODAL_ID)) return;

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = _MODAL_ID;
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'AI Settings');
        overlay.style.cssText = (
            'position:fixed;top:0;left:0;width:100%;height:100%;' +
            'background:rgba(0,0,0,0.45);z-index:9999;display:none;' +
            'align-items:center;justify-content:center;'
        );
        overlay.addEventListener('click', (e) => { if (e.target === overlay) Sys.AISettings.close(); });
        overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') Sys.AISettings.close(); });

        // Card
        const card = document.createElement('div');
        card.style.cssText = (
            'background:#ffffff;color:#111827;' +
            'padding:24px;border-radius:8px;width:400px;max-width:93vw;' +
            'box-shadow:0 8px 28px rgba(0,0,0,0.18);font-family:\'Inter\',sans-serif;' +
            'display:flex;flex-direction:column;gap:16px;'
        );

        // Header
        const header = document.createElement('div');
        header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;';

        const title = document.createElement('span');
        title.style.cssText = 'font-size:15px;font-weight:600;';
        title.textContent = 'AI Settings';

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.style.cssText = 'background:none;border:none;cursor:pointer;padding:4px;color:#6B7280;line-height:1;transition:color 0.15s;';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.addEventListener('mouseenter', () => { closeBtn.style.color = '#DC2626'; });
        closeBtn.addEventListener('mouseleave', () => { closeBtn.style.color = '#6B7280'; });
        const _cSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        _cSVG.setAttribute('viewBox','0 0 24 24'); _cSVG.setAttribute('width','14'); _cSVG.setAttribute('height','14');
        _cSVG.setAttribute('fill','none'); _cSVG.setAttribute('stroke','currentColor');
        _cSVG.setAttribute('stroke-width','2.5'); _cSVG.setAttribute('stroke-linecap','round');
        const _cl1 = document.createElementNS('http://www.w3.org/2000/svg','line');
        _cl1.setAttribute('x1','18');_cl1.setAttribute('y1','6');_cl1.setAttribute('x2','6');_cl1.setAttribute('y2','18');
        const _cl2 = document.createElementNS('http://www.w3.org/2000/svg','line');
        _cl2.setAttribute('x1','6');_cl2.setAttribute('y1','6');_cl2.setAttribute('x2','18');_cl2.setAttribute('y2','18');
        _cSVG.appendChild(_cl1); _cSVG.appendChild(_cl2);
        closeBtn.appendChild(_cSVG);
        closeBtn.addEventListener('click', Sys.AISettings.close);
        header.appendChild(title);
        header.appendChild(closeBtn);

        // Provider row
        const providerLabel = document.createElement('label');
        providerLabel.style.cssText = 'font-size:12px;font-weight:500;display:flex;flex-direction:column;gap:6px;';
        providerLabel.appendChild(document.createTextNode('Provider'));
        const select = document.createElement('select');
        select.id = 'ai-settings-provider-select';
        select.style.cssText = (
            'padding:8px 10px;border-radius:4px;border:1px solid #D1D5DB;' +
            'background:#F9FAFB;color:#111827;font-size:13px;font-family:\'Inter\',sans-serif;width:100%;'
        );
        PROVIDERS.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.label;
            select.appendChild(opt);
        });
        select.value = 'gemini';
        providerLabel.appendChild(select);

        // ── API Key section ───────────────────────────────────────────────────
        const keySection = document.createElement('div');
        keySection.style.cssText = 'display:flex;flex-direction:column;gap:6px;';

        // Row: "API Key" label + "Update" toggle link on the right
        const keyHeaderRow = document.createElement('div');
        keyHeaderRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;';

        const keyLabelText = document.createElement('span');
        keyLabelText.style.cssText = 'font-size:12px;font-weight:500;';
        keyLabelText.textContent = 'API Key';

        const updateLink = document.createElement('button');
        updateLink.id = 'ai-settings-update-link';
        updateLink.type = 'button';
        updateLink.style.cssText = (
            'background:none;border:none;padding:0;cursor:pointer;' +
            'font-size:11px;color:#0057C7;text-decoration:underline;display:none;'
        );
        updateLink.textContent = 'Update key';

        keyHeaderRow.appendChild(keyLabelText);
        keyHeaderRow.appendChild(updateLink);

        // Masked key display (shown when a key is already stored)
        const maskedDisplay = document.createElement('div');
        maskedDisplay.id = 'ai-settings-masked';
        maskedDisplay.style.cssText = (
            'padding:8px 10px;border-radius:4px;border:1px solid #D1D5DB;' +
            'background:#F9FAFB;color:#6B7280;font-size:13px;font-family:monospace;' +
            'letter-spacing:0.05em;display:none;'
        );

        // Actual key input (shown when no key stored, or when "Update" is clicked)
        const keyInput = document.createElement('input');
        keyInput.id = 'ai-settings-key-input';
        keyInput.type = 'password';
        keyInput.autocomplete = 'off';
        keyInput.maxLength = 200;
        keyInput.style.cssText = (
            'padding:8px 10px;border-radius:4px;border:1px solid #D1D5DB;' +
            'background:#F9FAFB;color:#111827;font-size:13px;font-family:\'Inter\',sans-serif;' +
            'width:100%;box-sizing:border-box;display:block;'
        );

        // Helper label under key input (shows intent when key is optional)
        const keyHint = document.createElement('div');
        keyHint.id = 'ai-settings-key-hint';
        keyHint.style.cssText = 'font-size:11px;color:#6B7280;display:none;';
        keyHint.textContent = 'Leave empty to keep the existing key and only switch the provider.';

        keySection.appendChild(keyHeaderRow);
        keySection.appendChild(maskedDisplay);
        keySection.appendChild(keyInput);
        keySection.appendChild(keyHint);

        // "Update" link toggles between masked display and input
        updateLink.addEventListener('click', () => {
            maskedDisplay.style.display = 'none';
            updateLink.style.display = 'none';
            keyInput.style.display = 'block';
            keyHint.style.display = 'block';
            keyInput.placeholder = '';
            keyInput.focus();
        });

        // Status line
        const statusEl = document.createElement('div');
        statusEl.id = 'ai-settings-status';
        statusEl.style.cssText = 'font-size:12px;min-height:18px;';

        // Apply button
        const applyBtn = document.createElement('button');
        applyBtn.type = 'button';
        applyBtn.id = 'ai-settings-apply-btn';
        applyBtn.style.cssText = (
            'padding:9px 16px;background:#0057C7;color:#fff;' +
            'border:none;border-radius:4px;font-size:13px;font-weight:600;' +
            'cursor:pointer;font-family:\'Inter\',sans-serif;'
        );
        applyBtn.textContent = 'Apply & Save';

        applyBtn.addEventListener('click', () => _handleApply(select, keyInput, maskedDisplay, statusEl, applyBtn));
        keyInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') _handleApply(select, keyInput, maskedDisplay, statusEl, applyBtn);
        });

        // When provider changes, refresh key status for the newly selected provider
        select.addEventListener('change', () => _refreshKeyStatus(select.value, maskedDisplay, updateLink, keyInput, keyHint, statusEl));

        card.appendChild(header);
        card.appendChild(providerLabel);
        card.appendChild(keySection);
        card.appendChild(statusEl);
        card.appendChild(applyBtn);
        overlay.appendChild(card);

        const root = document.getElementById('ai-settings-modal-root') || document.body;
        root.appendChild(overlay);
    }

    // ── Refresh key status UI for a provider ─────────────────────────────────
    async function _refreshKeyStatus(providerId, maskedDisplay, updateLink, keyInput, keyHint, statusEl) {
        _setStatus(statusEl, '', '');
        // Reset to loading state
        maskedDisplay.style.display = 'none';
        updateLink.style.display = 'none';
        keyInput.style.display = 'block';
        keyInput.value = '';
        keyHint.style.display = 'none';

        const p = PROVIDERS.find(x => x.id === providerId);
        keyInput.placeholder = p ? p.placeholder : '';

        const status = await _getKeyStatus(providerId);
        if (status.exists) {
            // Show masked key + Update link; hide input until user clicks Update
            maskedDisplay.textContent = status.masked;
            maskedDisplay.style.display = 'block';
            updateLink.style.display = 'inline';
            keyInput.style.display = 'none';
            keyInput.value = '';
            keyHint.style.display = 'none';
        }
        // If no key: input already visible with placeholder — nothing more to do
    }

    // ── Handle Apply ──────────────────────────────────────────────────────────
    async function _handleApply(select, keyInput, maskedDisplay, statusEl, applyBtn) {
        const provider = select.value;
        const apiKey   = keyInput.style.display !== 'none' ? keyInput.value.trim() : '';
        const keyVisible = keyInput.style.display !== 'none';

        // If key field is visible and has a value, validate it
        if (keyVisible && apiKey) {
            if (apiKey.length > 200) {
                _setStatus(statusEl, 'Key is too long (max 200 characters).', 'warn');
                return;
            }
            if (!/^[\x20-\x7E]+$/.test(apiKey)) {
                _setStatus(statusEl, 'Key contains invalid characters.', 'warn');
                return;
            }
        }

        // If key field is visible, empty, AND no existing key stored — require input
        if (keyVisible && !apiKey) {
            const status = await _getKeyStatus(provider);
            if (!status.exists) {
                _setStatus(statusEl, 'Please enter an API key for this provider.', 'warn');
                keyInput.focus();
                return;
            }
            // Key field empty but existing key stored → provider-switch-only
        }

        applyBtn.disabled = true;
        applyBtn.textContent = 'Saving...';
        _setStatus(statusEl, '', '');

        try {
            const isKeyUpdate = keyVisible && apiKey.length > 0;

            if (isKeyUpdate) {
                // ── Save new key + switch provider ────────────────────────────
                let result;
                if (window.providerSettings) {
                    result = await window.providerSettings.apply(provider, apiKey);
                } else {
                    const resp = await fetch('/set-provider', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ provider, api_key: apiKey }),
                    });
                    if (!resp.ok) throw new Error('HTTP ' + resp.status);
                    result = await resp.json();
                }
                if (result && result.ok) {
                    _setStatus(statusEl, 'Key saved. Provider switched to ' + _providerLabel(provider) + '.', 'ok');
                    keyInput.value = '';
                    Sys.Util.toast('AI provider switched to ' + _providerLabel(provider) + '.');
                    _resetChat(provider);
                } else {
                    _setStatus(statusEl, 'Error: ' + ((result && result.error) || 'Unknown error'), 'err');
                }

            } else {
                // ── Switch provider only (keep existing key) ──────────────────
                let result;
                if (window.providerSettings && window.providerSettings.switchOnly) {
                    result = await window.providerSettings.switchOnly(provider);
                } else {
                    // Browser/dev fallback: need to re-send via /set-provider with empty key
                    // Backend will only update the provider if no key is supplied; existing key stays
                    const resp = await fetch('/switch-provider', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ provider }),
                    });
                    if (!resp.ok) throw new Error('HTTP ' + resp.status);
                    result = await resp.json();
                }
                if (result && result.ok) {
                    _setStatus(statusEl, 'Provider switched to ' + _providerLabel(provider) + '.', 'ok');
                    Sys.Util.toast('AI provider switched to ' + _providerLabel(provider) + '.');
                    _resetChat(provider);
                } else {
                    _setStatus(statusEl, 'Error: ' + ((result && result.error) || 'Unknown error'), 'err');
                }
            }
        } catch (err) {
            _setStatus(statusEl, 'Error: ' + err.message, 'err');
        } finally {
            applyBtn.disabled = false;
            applyBtn.textContent = 'Apply & Save';
        }
    }

    function _providerLabel(id) {
        const p = PROVIDERS.find(x => x.id === id);
        return p ? p.label : id;
    }

    // ── Reset chat to welcome state after provider switch ─────────────────────
    function _resetChat(provider) {
        Sys.Chat.history = [];
        const msgs = document.getElementById('chat-messages');
        if (!msgs) return;
        while (msgs.firstChild) msgs.removeChild(msgs.firstChild);
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble bot';
        const line1 = document.createTextNode('AI Assistant is ready. Now using ');
        const strong = document.createElement('strong');
        strong.textContent = _providerLabel(provider);
        const line2 = document.createTextNode('. How can I help you with BigFix today?');
        bubble.appendChild(line1);
        bubble.appendChild(strong);
        bubble.appendChild(line2);
        msgs.appendChild(bubble);
        Sys.AISettings.close();
    }

    // ── Public API ────────────────────────────────────────────────────────────
    Sys.AISettings = {
        open: async () => {
            _buildModal();
            const modal = document.getElementById(_MODAL_ID);
            if (!modal) return;
            modal.style.display = 'flex';

            // Determine the current active provider
            let activeProvider = 'gemini';
            try {
                if (window.secureStore && window.secureStore.getActiveProvider) {
                    const stored = await window.secureStore.getActiveProvider();
                    if (stored) activeProvider = stored === 'anthropic' ? 'claude' : stored;
                } else {
                    const data = await fetch('/config-status').then(r => r.json());
                    if (data && data.provider) activeProvider = data.provider === 'anthropic' ? 'claude' : data.provider;
                }
            } catch (_) {}

            const sel        = document.getElementById('ai-settings-provider-select');
            const keyInput   = document.getElementById('ai-settings-key-input');
            const masked     = document.getElementById('ai-settings-masked');
            const updateLink = document.getElementById('ai-settings-update-link');
            const keyHint    = document.getElementById('ai-settings-key-hint');
            const statusEl   = document.getElementById('ai-settings-status');

            if (sel) sel.value = activeProvider;

            // Refresh key status for the active provider
            if (sel && masked && updateLink && keyInput && keyHint && statusEl) {
                await _refreshKeyStatus(activeProvider, masked, updateLink, keyInput, keyHint, statusEl);
            }

            // Focus: if key input is visible (no stored key), focus it; else focus Apply
            requestAnimationFrame(() => {
                const inp = document.getElementById('ai-settings-key-input');
                const btn = document.getElementById('ai-settings-apply-btn');
                if (inp && inp.style.display !== 'none') inp.focus();
                else if (btn) btn.focus();
            });
        },
        close: () => {
            const modal = document.getElementById(_MODAL_ID);
            if (modal) modal.style.display = 'none';
        },
    };

})();
