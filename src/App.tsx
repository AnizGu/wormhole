import { Flex } from "antd";
import styled from "styled-components";
import axios from "axios";
import WechatIcon from './assets/wechat.jpg';
import { forwardRef, useEffect, useState } from "react";

interface ButtonProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  [key: string]: any;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ disabled, children, onClick, ...props }, ref) => {
  return (
    <ButtonBase
      ref={ref}
      className={`weui-btn weui-btn_primary${disabled ? ' weui-btn_disabled' : ''}`}
      onClick={(event) => {
        if (!disabled)
          onClick && onClick(event);
      }}
      {...props}
    >
      {children}
    </ButtonBase>
  )
});

const ButtonBase = styled.button`
  &:hover {
    color: var(--weui-BTN-DISABLED-FONT-COLOR);
  }
`;

const SafeNotice = styled.p`
  padding-block: 6px;
  font-size: 12px;
`;

const Text = styled.p`
    display: inline-block;
    vertical-align: middle;
    font-size: var(--text-font-size);
    line-height: var(--text-line-height);
    color: var(--text-color);
    color: var(--weui-FG-1);
`;

const StrongText = styled.span`
  font-weight: var(--text-bold);
  color: var(--text-bold-color);
`;

const SafeIcon = styled.i`
  width: var(--safe-icon-size) !important;
  height: var(--safe-icon-size) !important;
  margin-right: 3px;
`;

const WechatLogo = styled.img`
  width: var(--logo-size);
  height: auto;
`;

const App: React.FC = () => {

  const [disabled, setDisabled] = useState(true);
  const [wormHoleUrl, setWormHoleUrl] = useState('https://www.baidu.com');

  useEffect(() => {
    fetchWormhole(true);
  }, []);

  const fetchWormhole = async (auto: boolean = false) => {
    const response = await axios.get("/dl/service/api/get_");
    if (response.status === 200 && response.data) {
      const data = response.data;
      if (data.code === 200 && data.message === "ok") {
        setDisabled(false);
        setWormHoleUrl(data.url);
        if (auto) {
          location.href = data.data.url;
        }
      }
    }
  }

  return (
    <Flex vertical align="center" justify="space-between" style={{ height: "var(--body-height)" }}>
      <Flex align="center" justify="center">
        <SafeIcon className="weui-icon-safe-success" />
        <SafeNotice>本链接经过<StrongText>SSL安全加密</StrongText>，请放心点击!</SafeNotice>
      </Flex>
      <Flex id="content-container" vertical align="center" justify="center">
        <WechatLogo src={WechatIcon} />
        <div role="alert" className="weui-loadmore">
          <span aria-hidden="true" role="img" aria-label="正在跳转到微信..." className="weui-primary-loading" style={{ color: 'var(--weui-BRAND)' }}>
            <i className="weui-primary-loading__dot"></i>
          </span>
          <Text>正在跳转到微信...</Text>
        </div>
      </Flex>
      <Flex vertical align="center" justify="center" gap={16} style={{ marginBlockEnd: 144 }}>
        <Text>如未自动打开微信请点击下方按钮</Text>
        <Button disabled={disabled} onClick={() => {
          location.href = wormHoleUrl;
        }}>点击跳转</Button>
      </Flex>
    </Flex>
  )
}

export default App
