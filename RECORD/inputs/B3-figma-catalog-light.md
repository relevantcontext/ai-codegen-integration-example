# B3 input — Figma `get_design_context` result, light-mode frame

Node `28:2` (`rare-metal-catalog`, the light-mode frame Frank added; file `CodeAssembly`
`AVLIqjQ21DfsfmVfBJB1tk`). Called 2026-09-22 with `clientFrameworks: spynejs`,
`clientLanguages: javascript,html,css`, `skillNames: figma-design-to-code`, screenshot excluded
(saved separately via `get_screenshot` as `B3-figma-catalog-light.png`, 1440 × 1626).
`get_variable_defs` on the frame returned no variables — the modes are two frames, not variable modes.

Transcription note as for `A1-figma-catalog.md`. The tool's three notes were identical and are
not repeated.

**Light values (vs the dark frame `4:4`):** section `#f0f4f8` (dark `#091725`); text `#111827`
(dark `#f3f4f6`); muted `#6b7280` (dark `#8e8e93`) — used for the eyebrow, mass and footnote where
the dark frame uses the accent; borders and the separator dot `#d1d5db` (dark `#222228` / `#33333c`);
card and filter boxes white (dark `#111115` / transparent); image container `#f3f4f6` (dark `#08080a`);
the Acquire button unchanged (`#d4c3a3` / `#08080a`); the image overlay unchanged (25% black).
Type is Inter as in v2.

```jsx
const imgProductImage = "https://www.figma.com/api/mcp/asset/f5ab2b7c-515e-4f21-9094-3e16aac0fd98.png";
const imgProductImage1 = "https://www.figma.com/api/mcp/asset/e6a360b7-d9b5-4dee-97db-9378b230d8ec.png";
const imgProductImage2 = "https://www.figma.com/api/mcp/asset/b8be6652-ea0e-40c0-98e3-a65f76770edb.png";
const imgProductImage3 = "https://www.figma.com/api/mcp/asset/2f852a3d-0fa8-4fde-a987-b951d7bdf859.png";
const imgProductImage4 = "https://www.figma.com/api/mcp/asset/0f91aa21-ad07-43f4-9106-6045b1544784.png";
const imgProductImage5 = "https://www.figma.com/api/mcp/asset/b44a5ce6-f8f7-410e-96f1-54eef2f6f418.png";
const imgLine = "https://www.figma.com/api/mcp/asset/6f2ba49a-8f4f-48bb-a2af-6ddc350f3b49.svg";
const imgChevronDown = "https://www.figma.com/api/mcp/asset/252e03cb-f06f-4e05-ab98-f65fae7a273a.svg";
const imgLine1 = "https://www.figma.com/api/mcp/asset/92abb5ca-6cfb-4404-a7ef-720c4a0036f2.svg";
const imgPlus = "https://www.figma.com/api/mcp/asset/08b173b5-ee16-4c82-ac66-a66c0d3e7fd2.svg";
const imgLine2 = "https://www.figma.com/api/mcp/asset/ce8bafb5-f610-46c8-8052-e26a533170ad.svg";

export default function RareMetalCatalog() {
  return (
    <div className="bg-[#f0f4f8] content-stretch flex flex-col gap-[48px] items-start px-[80px] py-[100px] relative size-full" data-node-id="28:2" data-name="rare-metal-catalog">
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="28:3" data-name="header-block">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-node-id="28:4" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#6b7280] text-[12px] uppercase w-full" data-node-id="28:5">{`METEORIC & ASTEROIDAL SAMPLES`}</p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#111827] text-[48px] w-full" data-node-id="28:6">{`Rare Earth & Heavy Metals`}</p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#6b7280] text-[16px] w-full" data-node-id="28:7">
            Archival-grade heavy metal specimens certified of off-world origin. Available in limited single-batch allocations.
          </p>
        </div>
        <div className="h-0 relative shrink-0 w-full" data-node-id="28:8" data-name="Line">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine} />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="28:9" data-name="filter-row">
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-node-id="28:10" data-name="filter-dropdowns">
          <div className="bg-white border border-[#d1d5db] border-solid content-stretch flex gap-[12px] h-[40px] items-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-node-id="28:11" data-name="filter-dropdown">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap" data-node-id="28:12">
              Metal type:
            </p>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap" data-node-id="28:13">
              All Specimens
            </p>
            <div className="relative shrink-0 size-[12px]" data-node-id="28:14" data-name="chevron-down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
            </div>
          </div>
          <div className="bg-white border border-[#d1d5db] border-solid content-stretch flex gap-[12px] h-[40px] items-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-node-id="28:16" data-name="filter-dropdown">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap" data-node-id="28:17">
              Origin asteroid:
            </p>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap" data-node-id="28:18">
              All Fields
            </p>
            <div className="relative shrink-0 size-[12px]" data-node-id="28:19" data-name="chevron-down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-center leading-[normal] not-italic relative shrink-0 text-[12px] whitespace-nowrap" data-node-id="28:21" data-name="Frame">
          <p className="relative shrink-0 text-[#6b7280]" data-node-id="28:22">
            SHOWING:
          </p>
          <p className="relative shrink-0 text-[#111827]" data-node-id="28:23">
            6 ARCHIVED LOTS
          </p>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="28:24" data-name="catalog-grid">
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-node-id="28:25" data-name="grid-row-1">
          <div className="bg-white border border-[#d1d5db] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="28:26" data-name="product-card">
            <div className="aspect-square bg-[#f3f4f6] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="28:27" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="28:28" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="28:29" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="28:30" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[20px] w-full" data-node-id="28:31">
                  Iridium Crystal Node
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="28:32" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:33">
                    101955 BENNU
                  </p>
                  <div className="bg-[#d1d5db] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="28:34" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:35">
                    12.44g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="28:36" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine1} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="28:37" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="28:38" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#6b7280] text-[10px] uppercase" data-node-id="28:39">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#111827] text-[16px]" data-node-id="28:40">
                    $4,250
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="28:41" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="28:42" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="28:44">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#d1d5db] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="28:45" data-name="product-card">
            <div className="aspect-square bg-[#f3f4f6] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="28:46" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="28:47" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage1} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="28:48" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="28:49" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[20px] w-full" data-node-id="28:50">
                  Osmium Spherule
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="28:51" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:52">
                    16 PSYCHE
                  </p>
                  <div className="bg-[#d1d5db] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="28:53" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:54">
                    84.10g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="28:55" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine2} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="28:56" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="28:57" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#6b7280] text-[10px] uppercase" data-node-id="28:58">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#111827] text-[16px]" data-node-id="28:59">
                    $9,800
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="28:60" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="28:61" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="28:63">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#d1d5db] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="28:64" data-name="product-card">
            <div className="aspect-square bg-[#f3f4f6] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="28:65" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="28:66" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage2} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="28:67" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="28:68" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[20px] w-full" data-node-id="28:69">
                  Rhodium Filament
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="28:70" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:71">
                    511 DAVIDA
                  </p>
                  <div className="bg-[#d1d5db] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="28:72" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:73">
                    5.21g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="28:74" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine2} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="28:75" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="28:76" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#6b7280] text-[10px] uppercase" data-node-id="28:77">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#111827] text-[16px]" data-node-id="28:78">
                    $12,150
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="28:79" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="28:80" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="28:82">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-node-id="28:83" data-name="grid-row-2">
          <div className="bg-white border border-[#d1d5db] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="28:84" data-name="product-card">
            <div className="aspect-square bg-[#f3f4f6] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="28:85" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="28:86" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage3} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="28:87" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="28:88" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[20px] w-full" data-node-id="28:89">
                  Platinum Drusy Plate
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="28:90" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:91">
                    25143 ITOKAWA
                  </p>
                  <div className="bg-[#d1d5db] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="28:92" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:93">
                    110.50g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="28:94" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine1} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="28:95" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="28:96" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#6b7280] text-[10px] uppercase" data-node-id="28:97">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#111827] text-[16px]" data-node-id="28:98">
                    $6,400
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="28:99" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="28:100" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="28:102">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#d1d5db] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="28:103" data-name="product-card">
            <div className="aspect-square bg-[#f3f4f6] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="28:104" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="28:105" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage4} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="28:106" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="28:107" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[20px] w-full" data-node-id="28:108">
                  Palladium Dendrite
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="28:109" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:110">
                    433 EROS
                  </p>
                  <div className="bg-[#d1d5db] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="28:111" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:112">
                    36.25g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="28:113" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine2} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="28:114" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="28:115" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#6b7280] text-[10px] uppercase" data-node-id="28:116">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#111827] text-[16px]" data-node-id="28:117">
                    $3,100
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="28:118" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="28:119" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="28:121">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#d1d5db] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="28:122" data-name="product-card">
            <div className="aspect-square bg-[#f3f4f6] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="28:123" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="28:124" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage5} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="28:125" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="28:126" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[20px] w-full" data-node-id="28:127">
                  Ruthenium Aggregated Matrix
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="28:128" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:129">
                    2 PALLAS
                  </p>
                  <div className="bg-[#d1d5db] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="28:130" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" data-node-id="28:131">
                    55.02g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="28:132" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine2} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="28:133" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="28:134" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#6b7280] text-[10px] uppercase" data-node-id="28:135">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#111827] text-[16px]" data-node-id="28:136">
                    $5,750
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="28:137" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="28:138" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="28:140">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between leading-[normal] not-italic pt-[24px] relative shrink-0 text-[#6b7280] text-[11px] w-full whitespace-nowrap" data-node-id="28:141" data-name="editorial-footnote">
        <p className="relative shrink-0" data-node-id="28:142">
          SECURE DISPATCH AND ASTEROIDAL PROVENANCE DOCUMENTATION ACCOMPANY EACH ORDER.
        </p>
        <p className="[text-underline-position:from-font] decoration-from-font decoration-solid relative shrink-0 underline" data-node-id="28:143">
          SPECIMEN AUTHENTICITY REPORT [PDF]
        </p>
      </div>
    </div>
  );
}
```
