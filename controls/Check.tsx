class Check extends React.Component<Props & WithStyles>{
  constructor(props: Props&WithStyles){
    super(props);
    }
   
  render(){
		let {name, label, classes, disabled, value} = this.props;
		let input = [
			<input key="1" type="checkbox" name={name} disabled={disabled} onChange={this.handleClick} defaultChecked={value}/>
			<span key="2" className={cs(classes.indicator,{checked:value})}/>
		]
}
																		
