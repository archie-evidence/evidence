<script>
  import Prism from "../QueryViewerSupport/Prismjs.svelte";
  import IoIosHelpCircleOutline from 'svelte-icons/io/IoIosHelpCircleOutline.svelte'

  export let credentials;
	export let existingCredentials;
  export let gitIgnore;
  export let disableSave = false;
  existingCredentials.gitignoreCSV = gitIgnore ? gitIgnore.match(/\n.csv(?=\n|$)/) : false;
  
  credentials = { ...existingCredentials };
  credentials = {
    gitignoreCSV: credentials.gitignoreCSV
  }

  let opts = [
    {
      id: "gitignoreCSV",
      label: "Gitignore all CSV files",
      type: "toggle",
      additionalInstructions: 'If enabled, Evidence will gitignore .csv files',
      optional: false,
      override: false,
      value: credentials.gitignoreCSV ?? true
    }
  ]

  let CSVQuery = 
  `select * 
from orders
left join customers 
  on orders.customer_id = customers.id`;

  function handleCheck() {
    disableSave = false;
    }


</script>

<div class="panel">
  <p>Add .csv files to your project folder to use as the data source for Evidence. Each file is loaded into a table.</p>
  <p>For example, if you added <code>orders.csv</code> and <code>customers.csv</code> then you could write:</p>
  <div class="code-container">
    <Prism language="sql" code={CSVQuery} />
  </div>
</div>

{#each opts as opt}
<div class=input-item>
    <label for={opt.id}>
        {opt.label}
        <span class="additional-info-icon">
                <IoIosHelpCircleOutline/>
                <span class=info-msg>{opt.additionalInstructions}</span>
        </span>
    </label>
<label class="switch">
<input type="checkbox" bind:checked={credentials[opt.id]} on:change={handleCheck}/>
<span class="slider" />
</label>
</div>
{/each}




<style>
  div.code-container {
    background-color: var(--grey-100);
    border: 1px solid var(--grey-200);
    overflow: auto;
    border-radius: 4px;
  }

  .panel {
    border-top: 1px;
  }


  span.additional-info-icon {
        width: 18px;
        color:var(--grey-600);
        display:inline-block;
        vertical-align: middle;
        line-height: 1em;
        cursor: help;
        position:relative;
        text-transform: none;
    }

    div.input-item{
        font-family: var(--ui-font-family);
        color: var(--grey-999);
        font-size: 16px;
        margin-top: 1.25em;
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }


    label {
        width: 30%;
        text-transform: uppercase;
        font-weight: normal;
        font-size: 14px;
        color: var(--grey-800);
        white-space: nowrap;
    }

 

    .additional-info-icon .info-msg {
        visibility: hidden;
        position: absolute;
        top: -5px;
        left: 105%;
        white-space: nowrap;
        padding-left: 5px;
        padding-right: 5px;     
        padding-top: 2px;
        padding-bottom: 1px;   
        color: white;
        font-family: sans-serif;
        font-size: 0.8em;
        background-color: var(--grey-900);
        opacity: 0.85;
        border-radius: 6px;
        z-index: 1;
    }

    .additional-info-icon:hover .info-msg {
        visibility: visible;
    }



  



       .switch {
      position: relative;
      display: inline-block;
      width: 2.8rem;
      height: 1.75rem;
      margin-left: auto;
      margin-right: 2px;
    }
  
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 25px;
    }
  
    .slider:before {
      position: absolute;
      content: "";
      height: 1.25rem;
      width: 1.25rem;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
      box-shadow: 0px 1px 2px var(--grey-500);

    }
  
    input:checked + .slider {
      background-color: var(--green-500);
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(1.1rem);
      -ms-transform: translateX(1.1rem);
      transform: translateX(1.1rem);
    }
</style>
