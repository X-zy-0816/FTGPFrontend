#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun May 14 12:48:01 2023

@author: zhangzhang
"""

import numpy as np
import pandas as pd
import requests
from datetime import datetime, timedelta
from scipy.optimize import minimize
import json


def get_crypto_prices(start_date, end_date, coins=['BTC', 'ETH', 'BNB', 'USDT', 'USDC']):
    df = pd.DataFrame()
    coin_names = ['bitcoin', 'ethereum', 'binancecoin', 'tether', 'usd-coin']


    for coin in coin_names:
        url = f'https://api.coingecko.com/api/v3/coins/{coin}/market_chart/range?vs_currency=usd&from={start_date}&to={end_date}'
        response = requests.get(url)
        data = response.json()
        print(f"Data for {coin}: {data}")
        
        
        if 'prices' not in data:
            print(f"Failed to get data for {coin}. Response: {data}")
            continue


        prices = pd.DataFrame(data['prices'], columns=['time', coin])
        prices['time'] = pd.to_datetime(prices['time'], unit='ms')
        prices.set_index('time', inplace=True, drop=False)
        prices.drop(columns='time', inplace=True)

        if df.empty:
            df = prices
        else:
            df = df.join(prices)

    return df.dropna()


# 目标函数：最大化效用函数（预期收益率 - 0.5 * 风险厌恶系数 * 方差）
#Objective function: maximise utility function (expected return - 0.5 * risk aversion factor * variance)
def objective(weights, expected_returns, cov_matrix,risk_aversion):
    portfolio_variance = np.dot(weights.T, np.dot(cov_matrix, weights))
    portfolio_return = np.dot(weights.T, expected_returns)
    utility = portfolio_return - 0.5 * risk_aversion * portfolio_variance
    return -utility  # minimize negative utility

# 根据风险偏好计算最优投资组合# Calculate optimal portfolio based on risk appetite
def optimize_portfolio(objective, constraints, bounds, expected_returns, cov_matrix, returns,risk_aversion):
    initial_weights = np.ones(len(returns.columns)) / len(returns.columns)
    result = minimize(objective, initial_weights, method='SLSQP', 
                      args=(expected_returns, cov_matrix,risk_aversion), bounds=bounds, constraints=constraints)
    optimal_weights = result.x
    return optimal_weights



def main():
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)  # 获取过去一年的数据Access to data from the past year

    # 从API获取虚拟货币价格数据 Get virtual currency price data from the API
    data = get_crypto_prices(int(start_date.timestamp()), int(end_date.timestamp()))

    #mapping names
    name_mapping = {
        'bitcoin': 'BTC',
        'ethereum': 'ETH',
        'binancecoin': 'BNB',
        'tether': 'USDT',
        'usd-coin': 'USDC'
    }
    
    # 计算收益率Calculating the rate of return
    returns = data.pct_change().dropna()

    # 使用映射替换列名Replacing column names using mapping
    returns.rename(columns=name_mapping, inplace=True)
     
     
    # 年化预期收益率 Annualised expected rate of return
    expected_returns = returns.mean() * 252

    # 年化协方差矩阵Annualised covariance matrix
    cov_matrix = returns.cov() * 252
    
    # 边界条件：每个权重的取值范围在0到1之间Boundary conditions: each weight takes a value in the range 0 to 1
    bounds = [(0, 1)] * len(returns.columns)
    
    # 约束条件：权重之和为1 Constraint: the sum of the weights is 1
    constraints = [{'type': 'eq', 'fun': lambda x: np.sum(x) - 1.0}]
    
     #risk
    risk_aversion_levels = [5,2,1]
    
    all_results = {}
    for i,risk_aversion in enumerate(risk_aversion_levels,1):
         # 计算最优投资组合的权重Calculating the weights of the optimal portfolio
         optimal_weights = optimize_portfolio(objective, constraints, bounds, expected_returns, cov_matrix, returns, risk_aversion)
    # 创建一个字典，包含资产名称和相应的权重百分比
         PCAFolio = {
             'tokens': returns.columns.tolist(),
             'percentage': (optimal_weights * 100).tolist(),
            }

    # 打印结果
         all_results[f'Markowitz-{i}'] = PCAFolio

    uniswap = {
        "tokens": ["UNI", "LINK", "USDC"],
        "percentage": [11.6, 76.97302502068577, 11.42697497931423]
    }

    all_results = {'UNISWAP': uniswap, **all_results}
    
    with open('./Markowitz.js', 'w') as f:
       f.write('export const Markowitz = ')
       json.dump(all_results, f, indent=2)
         

if __name__ == '__main__':
    main()
    

    
    
    
    
    