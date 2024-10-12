"use client";
import { Button } from "@/catalyst/button";
import { Heading } from "@/catalyst/heading";
import { Divider } from "@/catalyst/divider";
import { Avatar } from "@/catalyst/avatar";


const Hero = () => {
  return (
    <section className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-6">
        <Avatar
          src="/images/logo.svg" // Replace with your logo path
          alt="CA Home Buyers Hub Logo"
          className="w-32 h-32"
        />

        <Heading level={1} className="text-3xl sm:text-5xl font-bold">
          Welcome to CA Home Buyers Hub
        </Heading>

        <p className="text-lg sm:text-xl text-muted max-w-2xl">
          Your trusted partner in California for making home buying and selling easier, faster, and more transparent. Whether you&apos;re a homeowner looking to sell or a buyer seeking the best deals, our platform offers a seamless experience tailored to your needs.
        </p>
        
        <div className="space-y-2 sm:space-y-0 sm:space-x-4 sm:flex sm:flex-row">
          <Button
            className="bg-primary text-white"
            
            href="/get-offer"
          >
            Get Your Offer
          </Button>
          <Button
            className="bg-secondary text-primary"
            
            href="/join"
          >
            Join the Hub
          </Button>
        </div>

        <Divider className="w-24 mx-auto my-8" />

        <p className="text-sm text-muted">
          Ready to take the next step? Connect with our community and explore opportunities to buy or sell your home.
        </p>
      </div>
    </section>
  );
};

export default Hero;
