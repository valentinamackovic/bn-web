import React, { Component } from "react";
import BoxInput from "../form/BoxInput";

const DEBOUNCE_DELAY = 500;

class SearchInput extends Component {
	state = {
		searchQuery: ""
	};

	componentWillUnmount() {
		this.clearDebounceTimer();
	}

	clearDebounceTimer() {
		if (this.debounceTimeout) {
			clearTimeout(this.debounceTimeout);
		}
	}

	onSearch({ target }) {
		const { onSearch } = this.props;
		const searchQuery = target.value;
		this.setState({ searchQuery }, () => {
			this.clearDebounceTimer();
			this.debounceTimeout = setTimeout(
				() => onSearch(searchQuery),
				DEBOUNCE_DELAY
			);
		});
	}

	render() {
		const { searchQuery } = this.state;
		const { placeholder } = this.props;
		return (
			<BoxInput
				name="Search"
				value={searchQuery}
				placeholder={placeholder}
				onChange={this.onSearch.bind(this)}
			/>
		);
	}
}

export default SearchInput;
